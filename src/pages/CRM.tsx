import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, Users, Target } from "lucide-react";

export default function CRM() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">CRM</h1>

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
                      Conteúdo do Pipeline de Vendas será implementado aqui.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activities">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      Conteúdo das Atividades será implementado aqui.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="campaigns">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      Conteúdo das Campanhas será implementado aqui.
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