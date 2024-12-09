import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function TelegramConfig() {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    // Store in localStorage for now - in a real app, this should be stored securely
    localStorage.setItem('telegramConfig', JSON.stringify({ botToken, chatId }));
    toast({
      title: "Success",
      description: "Telegram configuration saved successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Telegram Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="botToken">Bot Token</Label>
          <Input
            id="botToken"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            placeholder="Enter your Telegram bot token"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="chatId">Chat ID</Label>
          <Input
            id="chatId"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            placeholder="Enter your Telegram chat ID"
          />
        </div>
        <Button onClick={handleSave}>Save Configuration</Button>
      </CardContent>
    </Card>
  );
}