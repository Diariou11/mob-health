export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_consultations: {
        Row: {
          ai_response: string
          consultation_type: string
          created_at: string
          id: string
          input_data: Json
          model_used: string | null
          user_id: string
        }
        Insert: {
          ai_response: string
          consultation_type: string
          created_at?: string
          id?: string
          input_data: Json
          model_used?: string | null
          user_id: string
        }
        Update: {
          ai_response?: string
          consultation_type?: string
          created_at?: string
          id?: string
          input_data?: Json
          model_used?: string | null
          user_id?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          doctor_id: string
          facility_id: string
          id: string
          notes: string | null
          patient_id: string
          reason: string
          status: Database["public"]["Enums"]["appointment_status"] | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          created_at?: string
          doctor_id: string
          facility_id: string
          id?: string
          notes?: string | null
          patient_id: string
          reason: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          created_at?: string
          doctor_id?: string
          facility_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          reason?: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "health_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          availability_schedule: Json | null
          consultation_fee: number | null
          created_at: string
          email: string | null
          facility_id: string | null
          full_name: string
          id: string
          image_url: string | null
          is_available: boolean | null
          languages: string[]
          phone: string | null
          qualifications: string[] | null
          specialty: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          availability_schedule?: Json | null
          consultation_fee?: number | null
          created_at?: string
          email?: string | null
          facility_id?: string | null
          full_name: string
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          languages?: string[]
          phone?: string | null
          qualifications?: string[] | null
          specialty: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          availability_schedule?: Json | null
          consultation_fee?: number | null
          created_at?: string
          email?: string | null
          facility_id?: string | null
          full_name?: string
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          languages?: string[]
          phone?: string | null
          qualifications?: string[] | null
          specialty?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctors_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "health_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_requests: {
        Row: {
          assigned_facility_id: string | null
          created_at: string
          description: string
          id: string
          latitude: number
          longitude: number
          patient_id: string
          resolved_at: string | null
          response_time: string | null
          status: string | null
          updated_at: string
          urgency_level: Database["public"]["Enums"]["urgency_level"] | null
        }
        Insert: {
          assigned_facility_id?: string | null
          created_at?: string
          description: string
          id?: string
          latitude: number
          longitude: number
          patient_id: string
          resolved_at?: string | null
          response_time?: string | null
          status?: string | null
          updated_at?: string
          urgency_level?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Update: {
          assigned_facility_id?: string | null
          created_at?: string
          description?: string
          id?: string
          latitude?: number
          longitude?: number
          patient_id?: string
          resolved_at?: string | null
          response_time?: string | null
          status?: string | null
          updated_at?: string
          urgency_level?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_requests_assigned_facility_id_fkey"
            columns: ["assigned_facility_id"]
            isOneToOne: false
            referencedRelation: "health_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_reviews: {
        Row: {
          comment: string | null
          created_at: string
          facility_id: string
          id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          facility_id: string
          id?: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          facility_id?: string
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_reviews_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "health_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      health_facilities: {
        Row: {
          address: string
          beds: number | null
          category: string
          created_at: string
          doctors_count: number | null
          has_blood_bank: boolean | null
          has_emergency: boolean | null
          hours_saturday: string | null
          hours_sunday: string | null
          hours_weekday: string | null
          id: string
          image_url: string | null
          languages: string[]
          latitude: number
          longitude: number
          name: string
          phone: string | null
          services: string[]
          specialty: string[]
          status: Database["public"]["Enums"]["facility_status"] | null
          type: Database["public"]["Enums"]["facility_type"]
          updated_at: string
        }
        Insert: {
          address: string
          beds?: number | null
          category: string
          created_at?: string
          doctors_count?: number | null
          has_blood_bank?: boolean | null
          has_emergency?: boolean | null
          hours_saturday?: string | null
          hours_sunday?: string | null
          hours_weekday?: string | null
          id?: string
          image_url?: string | null
          languages?: string[]
          latitude: number
          longitude: number
          name: string
          phone?: string | null
          services?: string[]
          specialty?: string[]
          status?: Database["public"]["Enums"]["facility_status"] | null
          type: Database["public"]["Enums"]["facility_type"]
          updated_at?: string
        }
        Update: {
          address?: string
          beds?: number | null
          category?: string
          created_at?: string
          doctors_count?: number | null
          has_blood_bank?: boolean | null
          has_emergency?: boolean | null
          hours_saturday?: string | null
          hours_sunday?: string | null
          hours_weekday?: string | null
          id?: string
          image_url?: string | null
          languages?: string[]
          latitude?: number
          longitude?: number
          name?: string
          phone?: string | null
          services?: string[]
          specialty?: string[]
          status?: Database["public"]["Enums"]["facility_status"] | null
          type?: Database["public"]["Enums"]["facility_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "doctor" | "patient"
      appointment_status: "pending" | "confirmed" | "cancelled" | "completed"
      facility_status: "open" | "closed" | "emergency_only"
      facility_type: "hopital" | "clinique" | "centre"
      urgency_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "doctor", "patient"],
      appointment_status: ["pending", "confirmed", "cancelled", "completed"],
      facility_status: ["open", "closed", "emergency_only"],
      facility_type: ["hopital", "clinique", "centre"],
      urgency_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
