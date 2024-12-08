import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password.length >= 8) {
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Credenciais inválidas",
        description: "Por favor, verifique seu email e senha",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais para acessar sua conta
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <div className="text-sm text-center space-x-1">
              <a href="#" className="text-primary hover:underline">
                Esqueceu sua senha?
              </a>
              <span>·</span>
              <a href="#" className="text-primary hover:underline">
                Criar conta
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}