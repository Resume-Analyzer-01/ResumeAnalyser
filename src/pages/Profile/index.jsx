import { useState, useEffect } from 'react'
import { Save, UploadCloud } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../lib/axios'
import { DashboardShell } from '../../layouts/DashboardShell'
import { PageTransition } from '../../components/common/PageTransition'
import { Avatar } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { Checkbox } from '../../components/ui/Checkbox'
import { Dropdown } from '../../components/ui/Dropdown'
import { GlassCard } from '../../components/ui/GlassCard'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { PasswordInput } from '../../components/ui/PasswordInput'
import { useToast } from '../../contexts/ToastContext'

const ProfilePage = () => {
  const { addToast } = useToast()
  const { user, updateProfileLocally } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    bio: ''
  })
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        portfolio: user.portfolio || '',
        bio: user.bio || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (event) => {
    if (event) event.preventDefault()
    setLoading(true)
    try {
      const res = await api.put('/auth/profile', formData)
      if (res.data.success) {
        updateProfileLocally(res.data.data)
        addToast('Profile Saved', 'Your profile details have been successfully updated.', 'success')
      } else {
        addToast('Error', res.data.message || 'Failed to update profile.', 'danger')
      }
    } catch (error) {
      addToast('Error', error.response?.data?.message || 'Network error.', 'danger')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <PageTransition>
      <DashboardShell
        title="Profile"
        description="Manage personal information, portfolio links, notification preferences, and account security."
        actions={
          <Button onClick={handleSave} disabled={loading} className="gap-2">
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        }
      >
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <GlassCard className="p-6">
            <div className="flex flex-col items-center text-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-full" />
              ) : (
                <Avatar name={user?.name || 'User'} size="xl" />
              )}
              <h2 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">{user?.name || 'User'}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user?.role === 'admin' ? 'Administrator' : 'Member'}</p>
              <Button variant="secondary" className="mt-5 gap-2" onClick={() => addToast('Image Upload', 'Mock profile image upload triggered.', 'info')}>
                <UploadCloud size={16} />
                Upload profile image
              </Button>
            </div>
            <div className="mt-8 space-y-3">
              <Checkbox label="Report notifications" description="Email me when a resume report is ready." defaultChecked />
              <Checkbox label="Weekly summary" description="Send activity summaries and score movement." />
              <Checkbox label="Product updates" description="Receive important product and template updates." defaultChecked />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSave}>
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
              <Input label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              <Input label="GitHub" name="github" value={formData.github} onChange={handleChange} />
              <Input label="Portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} />
              <div className="md:col-span-2">
                <Textarea label="Bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
              </div>
              <Dropdown
                label="Theme Preference"
                defaultValue="system"
                options={[
                  { value: 'system', label: 'Use system preference' },
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' }
                ]}
              />
              <Dropdown
                label="Language"
                defaultValue="en"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' }
                ]}
              />
              <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full gap-2">
                  <Save size={16} />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </DashboardShell>
    </PageTransition>
  )
}

export default ProfilePage

