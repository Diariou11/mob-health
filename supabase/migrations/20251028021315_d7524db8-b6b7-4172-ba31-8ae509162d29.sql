-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'doctor', 'patient');

-- Create enum for facility types
CREATE TYPE public.facility_type AS ENUM ('hopital', 'clinique', 'centre');

-- Create enum for facility status
CREATE TYPE public.facility_status AS ENUM ('open', 'closed', 'emergency_only');

-- Create enum for appointment status
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Create enum for emergency urgency levels
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high', 'critical');

-- =====================================================
-- PROFILES TABLE
-- =====================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT DEFAULT 'Conakry',
  date_of_birth DATE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- USER ROLES TABLE
-- =====================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- User roles RLS policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- =====================================================
-- SECURITY DEFINER FUNCTION FOR ROLE CHECKING
-- =====================================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- =====================================================
-- HEALTH FACILITIES TABLE
-- =====================================================
CREATE TABLE public.health_facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type facility_type NOT NULL,
  category TEXT NOT NULL,
  specialty TEXT[] NOT NULL DEFAULT '{}',
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  beds INTEGER DEFAULT 0,
  doctors_count INTEGER DEFAULT 0,
  services TEXT[] NOT NULL DEFAULT '{}',
  has_emergency BOOLEAN DEFAULT FALSE,
  has_blood_bank BOOLEAN DEFAULT FALSE,
  languages TEXT[] NOT NULL DEFAULT '{"francais"}',
  image_url TEXT,
  status facility_status DEFAULT 'open',
  hours_weekday TEXT DEFAULT '08:00-18:00',
  hours_saturday TEXT DEFAULT '08:00-14:00',
  hours_sunday TEXT DEFAULT 'Fermé',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.health_facilities ENABLE ROW LEVEL SECURITY;

-- Health facilities RLS policies (public read, admin write)
CREATE POLICY "Anyone can view facilities"
  ON public.health_facilities FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert facilities"
  ON public.health_facilities FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update facilities"
  ON public.health_facilities FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete facilities"
  ON public.health_facilities FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- DOCTORS TABLE
-- =====================================================
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  facility_id UUID REFERENCES public.health_facilities(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  qualifications TEXT[] DEFAULT '{}',
  languages TEXT[] NOT NULL DEFAULT '{"francais"}',
  phone TEXT,
  email TEXT,
  consultation_fee DECIMAL(10, 2),
  availability_schedule JSONB,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Doctors RLS policies
CREATE POLICY "Anyone can view doctors"
  ON public.doctors FOR SELECT
  USING (true);

CREATE POLICY "Doctors can update their own profile"
  ON public.doctors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage doctors"
  ON public.doctors FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- APPOINTMENTS TABLE
-- =====================================================
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  facility_id UUID REFERENCES public.health_facilities(id) ON DELETE CASCADE NOT NULL,
  appointment_date TIMESTAMPTZ NOT NULL,
  reason TEXT NOT NULL,
  status appointment_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT future_appointment CHECK (appointment_date > NOW())
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Appointments RLS policies
CREATE POLICY "Patients can view their own appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own appointments"
  ON public.appointments FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view their appointments"
  ON public.appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.doctors
      WHERE doctors.id = appointments.doctor_id
        AND doctors.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can update their appointments"
  ON public.appointments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.doctors
      WHERE doctors.id = appointments.doctor_id
        AND doctors.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all appointments"
  ON public.appointments FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- EMERGENCY REQUESTS TABLE
-- =====================================================
CREATE TABLE public.emergency_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  description TEXT NOT NULL,
  urgency_level urgency_level DEFAULT 'high',
  assigned_facility_id UUID REFERENCES public.health_facilities(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending',
  response_time TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.emergency_requests ENABLE ROW LEVEL SECURITY;

-- Emergency requests RLS policies
CREATE POLICY "Patients can view their own emergencies"
  ON public.emergency_requests FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can create emergency requests"
  ON public.emergency_requests FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Admins and doctors can view all emergencies"
  ON public.emergency_requests FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'doctor')
  );

CREATE POLICY "Admins can manage emergencies"
  ON public.emergency_requests FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- AI CONSULTATIONS TABLE
-- =====================================================
CREATE TABLE public.ai_consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  consultation_type TEXT NOT NULL, -- 'chat' or 'image_analysis'
  input_data JSONB NOT NULL,
  ai_response TEXT NOT NULL,
  model_used TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ai_consultations ENABLE ROW LEVEL SECURITY;

-- AI consultations RLS policies
CREATE POLICY "Users can view their own consultations"
  ON public.ai_consultations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create consultations"
  ON public.ai_consultations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all consultations"
  ON public.ai_consultations FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- FACILITY REVIEWS TABLE
-- =====================================================
CREATE TABLE public.facility_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID REFERENCES public.health_facilities(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(facility_id, user_id)
);

ALTER TABLE public.facility_reviews ENABLE ROW LEVEL SECURITY;

-- Facility reviews RLS policies
CREATE POLICY "Anyone can view reviews"
  ON public.facility_reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON public.facility_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON public.facility_reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON public.facility_reviews FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS AND FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.health_facilities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.doctors
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.emergency_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.facility_reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Utilisateur'),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL)
  );
  
  -- Assign default 'patient' role to new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'patient');
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_health_facilities_type ON public.health_facilities(type);
CREATE INDEX idx_health_facilities_status ON public.health_facilities(status);
CREATE INDEX idx_health_facilities_location ON public.health_facilities(latitude, longitude);
CREATE INDEX idx_doctors_facility ON public.doctors(facility_id);
CREATE INDEX idx_doctors_specialty ON public.doctors(specialty);
CREATE INDEX idx_appointments_patient ON public.appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON public.appointments(doctor_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_emergency_location ON public.emergency_requests(latitude, longitude);
CREATE INDEX idx_emergency_status ON public.emergency_requests(status);
CREATE INDEX idx_ai_consultations_user ON public.ai_consultations(user_id);
CREATE INDEX idx_facility_reviews_facility ON public.facility_reviews(facility_id);