import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, Users, Target, Plus, Search } from "lucide-react";

export default function CRM() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold">CRM</h1>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar oportunidades..." 
                    className="pl-8 w-full md:w-[300px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Oportunidade
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Leads Ativos
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">
                    +12 novos leads hoje
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Oportunidades
                  </CardTitle>
                  <ChartBar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    R$ 230.500 em negociação
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Clientes Ativos
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">892</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="pipeline" className="w-full">
              <TabsList>
                <TabsTrigger value="pipeline">Pipeline de Vendas</TabsTrigger>
                <TabsTrigger value="activities">Atividades</TabsTrigger>
                <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
              </TabsList>
              <TabsContent value="pipeline">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      Implementar pipeline de vendas aqui
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activities">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      Implementar lista de atividades aqui
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="campaigns">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      Implementar lista de campanhas aqui
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}