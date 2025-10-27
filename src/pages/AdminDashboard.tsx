import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Building2, 
  MessageSquare, 
  AlertCircle, 
  TrendingUp, 
  Activity,
  Stethoscope,
  MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminDashboard() {
  const stats = [
    { 
      label: 'Utilisateurs actifs', 
      value: '2,547', 
      change: '+12%', 
      icon: Users,
      color: 'text-blue-500'
    },
    { 
      label: 'Établissements', 
      value: '43', 
      change: '+3', 
      icon: Building2,
      color: 'text-green-500'
    },
    { 
      label: 'Consultations IA', 
      value: '1,283', 
      change: '+24%', 
      icon: MessageSquare,
      color: 'text-purple-500'
    },
    { 
      label: 'Urgences traitées', 
      value: '89', 
      change: '+7%', 
      icon: AlertCircle,
      color: 'text-red-500'
    },
  ];

  const recentUsers = [
    { id: 1, name: 'Mamadou Diallo', email: 'mamadou@example.com', status: 'Actif', date: '2024-01-20' },
    { id: 2, name: 'Fatoumata Camara', email: 'fatoumata@example.com', status: 'Actif', date: '2024-01-19' },
    { id: 3, name: 'Ibrahima Sow', email: 'ibrahima@example.com', status: 'Inactif', date: '2024-01-18' },
    { id: 4, name: 'Aissatou Bah', email: 'aissatou@example.com', status: 'Actif', date: '2024-01-17' },
    { id: 5, name: 'Mohamed Keita', email: 'mohamed@example.com', status: 'Actif', date: '2024-01-16' },
  ];

  const recentConsultations = [
    { id: 1, patient: 'Anonyme #2547', symptomes: 'Fièvre, maux de tête', recommandation: 'Hôpital Central', date: '2024-01-20 14:30' },
    { id: 2, patient: 'Anonyme #2548', symptomes: 'Douleur abdominale', recommandation: 'Clinique Pasteur', date: '2024-01-20 13:15' },
    { id: 3, patient: 'Anonyme #2549', symptomes: 'Toux persistante', recommandation: 'Centre de Santé Matam', date: '2024-01-20 12:00' },
    { id: 4, patient: 'Anonyme #2550', symptomes: 'Éruption cutanée', recommandation: 'Hôpital Donka', date: '2024-01-20 11:45' },
  ];

  const facilities = [
    { name: 'Hôpital National Donka', city: 'Conakry', type: 'Hôpital', consultations: 342, status: 'Actif' },
    { name: 'Clinique Pasteur', city: 'Conakry', type: 'Clinique', consultations: 198, status: 'Actif' },
    { name: 'Centre de Santé Matam', city: 'Conakry', type: 'Centre de Santé', consultations: 156, status: 'Actif' },
    { name: 'Hôpital Régional de Kindia', city: 'Kindia', type: 'Hôpital', consultations: 89, status: 'Actif' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-health-blue to-clinic-green bg-clip-text text-transparent">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-muted-foreground">
            Gérez et surveillez la plateforme MOB-Health Africa
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="consultations">
              <MessageSquare className="h-4 w-4 mr-2" />
              Consultations IA
            </TabsTrigger>
            <TabsTrigger value="facilities">
              <Building2 className="h-4 w-4 mr-2" />
              Établissements
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <TrendingUp className="h-4 w-4 mr-2" />
              Statistiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Utilisateurs récents</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date d'inscription</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'Actif' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-4">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Consultations IA récentes</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Symptômes</TableHead>
                      <TableHead>Recommandation</TableHead>
                      <TableHead>Date & Heure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentConsultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">{consultation.patient}</TableCell>
                        <TableCell>{consultation.symptomes}</TableCell>
                        <TableCell>{consultation.recommandation}</TableCell>
                        <TableCell>{consultation.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-4">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Établissements de santé</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Ville</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Consultations</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facilities.map((facility, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{facility.name}</TableCell>
                        <TableCell>{facility.city}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{facility.type}</Badge>
                        </TableCell>
                        <TableCell>{facility.consultations}</TableCell>
                        <TableCell>
                          <Badge variant="default">{facility.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-health-blue" />
                  Activité par ville
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conakry</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-health-blue" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Kindia</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-clinic-green" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Labé</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Kankan</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: '38%' }}></div>
                      </div>
                      <span className="text-sm font-medium">38%</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-clinic-green" />
                  Top symptômes consultés
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fièvre</span>
                    <Badge>342</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Maux de tête</span>
                    <Badge>298</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Toux</span>
                    <Badge>267</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Douleur abdominale</span>
                    <Badge>189</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fatigue</span>
                    <Badge>156</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
