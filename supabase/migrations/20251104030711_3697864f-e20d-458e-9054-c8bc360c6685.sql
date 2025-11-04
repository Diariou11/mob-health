-- Table pour les consultations médicales
CREATE TABLE public.medical_consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
  facility_id UUID REFERENCES public.health_facilities(id) ON DELETE SET NULL,
  consultation_date TIMESTAMP WITH TIME ZONE NOT NULL,
  diagnosis TEXT,
  symptoms TEXT,
  prescription TEXT,
  notes TEXT,
  follow_up_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les ordonnances
CREATE TABLE public.prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.medical_consultations(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  instructions TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les vaccinations
CREATE TABLE public.vaccinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  vaccine_name TEXT NOT NULL,
  vaccine_type TEXT NOT NULL,
  dose_number INTEGER NOT NULL,
  administration_date DATE NOT NULL,
  next_dose_date DATE,
  administered_by TEXT,
  facility_id UUID REFERENCES public.health_facilities(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les allergies
CREATE TABLE public.allergies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  allergen TEXT NOT NULL,
  reaction TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('légère', 'modérée', 'sévère')),
  diagnosed_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les antécédents médicaux
CREATE TABLE public.medical_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  condition_name TEXT NOT NULL,
  condition_type TEXT NOT NULL CHECK (condition_type IN ('chronique', 'aiguë', 'héréditaire', 'chirurgicale')),
  diagnosed_date DATE,
  status TEXT NOT NULL DEFAULT 'actif' CHECK (status IN ('actif', 'résolu', 'en traitement')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les documents médicaux (ordonnances, analyses, radiographies)
CREATE TABLE public.medical_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.medical_consultations(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('ordonnance', 'analyse', 'radiographie', 'rapport', 'autre')),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('appointment_reminder', 'test_result', 'medication_reminder', 'health_alert', 'general')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.medical_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour medical_consultations
CREATE POLICY "Patients can view their own consultations"
  ON public.medical_consultations FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view consultations of their patients"
  ON public.medical_consultations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.doctors
    WHERE doctors.id = medical_consultations.doctor_id
    AND doctors.user_id = auth.uid()
  ));

CREATE POLICY "Doctors can insert consultations"
  ON public.medical_consultations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.doctors
    WHERE doctors.id = doctor_id
    AND doctors.user_id = auth.uid()
  ));

CREATE POLICY "Doctors can update their consultations"
  ON public.medical_consultations FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.doctors
    WHERE doctors.id = medical_consultations.doctor_id
    AND doctors.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all consultations"
  ON public.medical_consultations FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Politiques RLS pour prescriptions
CREATE POLICY "Patients can view their own prescriptions"
  ON public.prescriptions FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can manage prescriptions"
  ON public.prescriptions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.doctors
    WHERE doctors.id = prescriptions.doctor_id
    AND doctors.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all prescriptions"
  ON public.prescriptions FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Politiques RLS pour vaccinations
CREATE POLICY "Patients can view their own vaccinations"
  ON public.vaccinations FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert their own vaccinations"
  ON public.vaccinations FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own vaccinations"
  ON public.vaccinations FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Admins can manage all vaccinations"
  ON public.vaccinations FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Politiques RLS pour allergies
CREATE POLICY "Patients can manage their own allergies"
  ON public.allergies FOR ALL
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view patient allergies"
  ON public.allergies FOR SELECT
  USING (has_role(auth.uid(), 'doctor'));

CREATE POLICY "Admins can manage all allergies"
  ON public.allergies FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Politiques RLS pour medical_history
CREATE POLICY "Patients can manage their own medical history"
  ON public.medical_history FOR ALL
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view patient medical history"
  ON public.medical_history FOR SELECT
  USING (has_role(auth.uid(), 'doctor'));

CREATE POLICY "Admins can manage all medical history"
  ON public.medical_history FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Politiques RLS pour medical_documents
CREATE POLICY "Patients can manage their own documents"
  ON public.medical_documents FOR ALL
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view patient documents"
  ON public.medical_documents FOR SELECT
  USING (has_role(auth.uid(), 'doctor'));

CREATE POLICY "Admins can manage all documents"
  ON public.medical_documents FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Politiques RLS pour notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications"
  ON public.notifications FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Triggers pour updated_at
CREATE TRIGGER update_medical_consultations_updated_at
  BEFORE UPDATE ON public.medical_consultations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_prescriptions_updated_at
  BEFORE UPDATE ON public.prescriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_vaccinations_updated_at
  BEFORE UPDATE ON public.vaccinations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_allergies_updated_at
  BEFORE UPDATE ON public.allergies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_medical_history_updated_at
  BEFORE UPDATE ON public.medical_history
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Créer un bucket de stockage pour les documents médicaux
INSERT INTO storage.buckets (id, name, public)
VALUES ('medical-documents', 'medical-documents', false);

-- Politiques de stockage pour les documents médicaux
CREATE POLICY "Users can view their own documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Index pour améliorer les performances
CREATE INDEX idx_medical_consultations_patient_id ON public.medical_consultations(patient_id);
CREATE INDEX idx_medical_consultations_doctor_id ON public.medical_consultations(doctor_id);
CREATE INDEX idx_prescriptions_patient_id ON public.prescriptions(patient_id);
CREATE INDEX idx_vaccinations_patient_id ON public.vaccinations(patient_id);
CREATE INDEX idx_allergies_patient_id ON public.allergies(patient_id);
CREATE INDEX idx_medical_history_patient_id ON public.medical_history(patient_id);
CREATE INDEX idx_medical_documents_patient_id ON public.medical_documents(patient_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_scheduled_for ON public.notifications(scheduled_for);