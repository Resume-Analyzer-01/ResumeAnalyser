import { LogOut, ShieldAlert, Trash2 } from 'lucide-react'
import { settingsGroups } from '../../constants/mockData'
import { DashboardShell } from '../../layouts/DashboardShell'
import { PageTransition } from '../../components/common/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Checkbox } from '../../components/ui/Checkbox'
import { GlassCard } from '../../components/ui/GlassCard'
import { useToast } from '../../contexts/ToastContext'

const SettingsPage = () => {
  const { addToast } = useToast()

  return (
    <PageTransition>
      <DashboardShell
        title="Settings"
        description="Configure account, appearance, notifications, privacy, security, and language preferences."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {settingsGroups.map((group) => {
            const Icon = group.icon

            return (
              <GlassCard key={group.title} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-[16px] bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <Icon size={19} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">{group.title}</h2>
                  </div>
                  <Badge variant="accent">Active</Badge>
                </div>
                <div className="mt-5 space-y-3">
                  {group.options.map((option) => (
                    <Checkbox
                      key={option}
                      label={option}
                      className="bg-slate-50/80 dark:bg-white/5"
                      onChange={(e) => addToast('Setting Updated', `"${option}" preference has been updated.`, 'info')}
                    />
                  ))}
                </div>
              </GlassCard>
            )
          })}
        </div>

        <GlassCard className="mt-6 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <ShieldAlert size={22} className="text-rose-500" />
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Danger zone</h2>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Account deletion and logout controls are ready for backend permissions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                className="gap-2"
                onClick={() => addToast('Logged Out', 'You have been successfully logged out.', 'info')}
              >
                <LogOut size={16} />
                Logout
              </Button>
              <Button
                className="gap-2 bg-gradient-to-r from-rose-500 to-red-500"
                onClick={() => addToast('Account Deleted', 'Mock account deletion request submitted.', 'danger')}
              >
                <Trash2 size={16} />
                Delete Account
              </Button>
            </div>
          </div>
        </GlassCard>
      </DashboardShell>
    </PageTransition>
  )
}

export default SettingsPage

