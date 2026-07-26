import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@/shared/components/ui'
import { useLogin } from '@/features/auth/hooks/useAuth'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas/auth.schema'

export function LoginForm() {
  const loginMutation = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        id="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Senha"
        type="password"
        id="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm text-[var(--text-secondary)]">Lembrar de mim</span>
        </label>
        <button type="button" className="text-sm text-primary-500 hover:text-primary-600">
          Esqueceu a senha?
        </button>
      </div>
      <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
