import { Button, Card } from '@/src/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background-light)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">
            GoNow
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Painel Administrativo
          </p>
        </div>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Bem-vindo!
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Estrutura base configurada com tema preto e laranja.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary">
              Botão Primário
            </Button>
            <Button variant="secondary">
              Botão Secundário
            </Button>
            <Button variant="outline">
              Botão Outline
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
              Motoristas
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Gerenciar cadastros e aprovações
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
              Passageiros
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Visualizar e gerenciar usuários
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
              Viagens
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Histórico e relatórios
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
