"use client";

import { useState } from 'react';
import Link from 'next/link';
import initialProfile from '@/lib/profile.json';
import { 
  Lock, User, Code, Server, MessageSquare, 
  Save, LogOut, ArrowLeft, Plus, Trash2, 
  Check, Loader2, RefreshCw 
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  // Form states initialized with existing profile data
  const [profile, setProfile] = useState(initialProfile);

  // Auth check handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (!passcode) {
      setError('Please enter a passcode.');
      return;
    }
    // Set authenticated state (actual authentication happens at API level, but we check local storage / memory)
    setIsAuthenticated(true);
    setError('');
  };

  // Generic text field updater
  const updateHeroField = (field, value) => {
    setProfile(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }));
  };

  // Paragraph updaters
  const updateParagraph = (index, value) => {
    const updatedParagraphs = [...profile.about.paragraphs];
    updatedParagraphs[index] = value;
    setProfile(prev => ({
      ...prev,
      about: {
        ...prev.about,
        paragraphs: updatedParagraphs
      }
    }));
  };

  const addParagraph = () => {
    setProfile(prev => ({
      ...prev,
      about: {
        ...prev.about,
        paragraphs: [...prev.about.paragraphs, '']
      }
    }));
  };

  const removeParagraph = (index) => {
    const updatedParagraphs = profile.about.paragraphs.filter((_, i) => i !== index);
    setProfile(prev => ({
      ...prev,
      about: {
        ...prev.about,
        paragraphs: updatedParagraphs
      }
    }));
  };

  // Skill updaters
  const handleAddSkill = (category, skillText) => {
    if (!skillText.trim()) return;
    const categorySkills = [...(profile.skills[category] || [])];
    if (categorySkills.includes(skillText.trim())) return; // Avoid duplicates
    
    setProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...categorySkills, skillText.trim()]
      }
    }));
  };

  const handleRemoveSkill = (category, skillIndex) => {
    const categorySkills = profile.skills[category].filter((_, i) => i !== skillIndex);
    setProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: categorySkills
      }
    }));
  };

  const handleAddSkillCategory = (newCategoryName) => {
    const name = newCategoryName.trim();
    if (!name || profile.skills[name]) return;
    setProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [name]: []
      }
    }));
  };

  const handleRemoveSkillCategory = (category) => {
    if (confirm(`Are you sure you want to delete the "${category}" category and all its skills?`)) {
      const updatedSkills = { ...profile.skills };
      delete updatedSkills[category];
      setProfile(prev => ({
        ...prev,
        skills: updatedSkills
      }));
    }
  };

  // Service updaters
  const updateService = (index, field, value) => {
    const updatedServices = [...profile.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };
    setProfile(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addService = () => {
    setProfile(prev => ({
      ...prev,
      services: [
        ...prev.services,
        { title: 'New Service', desc: 'Description of the service.' }
      ]
    }));
  };

  const removeService = (index) => {
    const updatedServices = profile.services.filter((_, i) => i !== index);
    setProfile(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  // Contact field updater
  const updateContactField = (field, value) => {
    setProfile(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Save changes handler
  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passcode,
          data: profile
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to save changes.');
      }

      setSuccess(resData.message || 'Changes saved successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sub-component state for dynamic skill addition
  const SkillCategorySection = ({ category, skillsList }) => {
    const [newSkillText, setNewSkillText] = useState('');
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold text-cyan-300">{category}</h4>
          <button 
            onClick={() => handleRemoveSkillCategory(category)}
            className="p-1 hover:text-red-400 text-gray-400 transition-colors"
            title="Delete Category"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {skillsList.map((skill, index) => (
            <span key={index} className="flex items-center gap-1.5 px-3 py-1 bg-purple-900/40 text-purple-200 border border-purple-800/40 rounded-full text-sm">
              {skill}
              <button 
                onClick={() => handleRemoveSkill(category, index)}
                className="hover:text-red-400 font-bold ml-1 text-xs"
              >
                &times;
              </button>
            </span>
          ))}
          {skillsList.length === 0 && <p className="text-gray-500 text-sm italic">No skills in this category yet.</p>}
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add new skill..." 
            value={newSkillText}
            onChange={(e) => setNewSkillText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill(category, newSkillText);
                setNewSkillText('');
              }
            }}
            className="flex-grow bg-black/40 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-cyan-400"
          />
          <button 
            onClick={() => {
              handleAddSkill(category, newSkillText);
              setNewSkillText('');
            }}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white text-sm transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  // ------------------ RENDER AUTH SCREEN ------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0018] px-4 relative overflow-hidden font-sans">
        {/* Decorative ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide">Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your passcode to manage website data</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="passcode">
                Access Passcode
              </label>
              <input
                id="passcode"
                type="password"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-black/40 border border-white/20 hover:border-white/30 focus:border-cyan-400 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-colors text-center tracking-widest text-lg font-mono"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-950/80 rounded-xl p-3 text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl text-white font-bold tracking-wide shadow-lg hover:shadow-cyan-500/10 transition-all transform hover:scale-[1.02]"
            >
              Access Dashboard
            </button>
          </form>

          <div className="text-center mt-8">
            <Link 
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-1.5" /> Back to portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ------------------ RENDER ADMIN DASHBOARD ------------------
  return (
    <main className="min-h-screen bg-[#070012] text-gray-100 font-sans pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Admin Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-300 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Ayush R | Portfolio Admin
              </h1>
              <p className="text-xs text-gray-400">Live data synchronization dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-900/30 hover:scale-[1.03] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPasscode('');
                setSuccess('');
                setError('');
              }}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-gray-300 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Save Notifications */}
        {success && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 rounded-2xl p-4 mb-6 flex items-start gap-3 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <div className="p-1 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Check size={18} />
            </div>
            <div>
              <h4 className="font-semibold">Successfully Saved!</h4>
              <p className="text-sm text-emerald-300/80 mt-0.5">{success}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-950/40 border border-red-500/30 text-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="p-1 bg-red-500/10 rounded-lg text-red-400">
              <LogOut className="rotate-180" size={18} />
            </div>
            <div>
              <h4 className="font-semibold">Update Failed</h4>
              <p className="text-sm text-red-300/80 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tabs Sidebar */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/10 pr-0 lg:pr-4">
            <TabButton id="hero" icon={User} label="Hero Intro" />
            <TabButton id="about" icon={User} label="About Text" />
            <TabButton id="skills" icon={Code} label="Skills List" />
            <TabButton id="services" icon={Server} label="Services" />
            <TabButton id="contact" icon={MessageSquare} label="Contact details" />
          </div>

          {/* Form Content Area */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold border-b border-white/10 pb-4 text-white">Hero Section Configuration</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={profile.hero.name}
                      onChange={(e) => updateHeroField('name', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Subtitle (Title)</label>
                    <input 
                      type="text" 
                      value={profile.hero.title}
                      onChange={(e) => updateHeroField('title', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Hero Bio description</label>
                    <textarea 
                      rows={4}
                      value={profile.hero.bio}
                      onChange={(e) => updateHeroField('bio', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-bold text-white">About Me Paragraphs</h3>
                  <button
                    onClick={addParagraph}
                    className="px-4 py-2 bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 rounded-xl flex items-center gap-1.5 text-sm transition-colors"
                  >
                    <Plus size={16} /> Add Paragraph
                  </button>
                </div>
                <div className="space-y-4">
                  {profile.about.paragraphs.map((para, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-grow">
                        <label className="block text-xs text-gray-400 mb-1">Paragraph #{index + 1}</label>
                        <textarea 
                          rows={3}
                          value={para}
                          onChange={(e) => updateParagraph(index, e.target.value)}
                          className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                        />
                      </div>
                      <button
                        onClick={() => removeParagraph(index)}
                        className="p-3 bg-red-950/20 hover:bg-red-950/60 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl transition-all self-center"
                        title="Delete Paragraph"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {profile.about.paragraphs.length === 0 && (
                    <p className="text-gray-500 italic text-center py-8">No paragraphs defined. Add one above!</p>
                  )}
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-bold text-white">Skills Library</h3>
                  <button
                    onClick={() => {
                      const name = prompt('Enter new skill category name:');
                      if (name) handleAddSkillCategory(name);
                    }}
                    className="px-4 py-2 bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 rounded-xl flex items-center gap-1.5 text-sm transition-colors"
                  >
                    <Plus size={16} /> New Category
                  </button>
                </div>
                <div className="space-y-4">
                  {Object.entries(profile.skills).map(([category, itemsList]) => (
                    <SkillCategorySection 
                      key={category} 
                      category={category} 
                      skillsList={itemsList} 
                    />
                  ))}
                  {Object.keys(profile.skills).length === 0 && (
                    <p className="text-gray-500 italic text-center py-8">No skill categories defined. Create one above!</p>
                  )}
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-bold text-white">Services Offered</h3>
                  <button
                    onClick={addService}
                    className="px-4 py-2 bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 rounded-xl flex items-center gap-1.5 text-sm transition-colors"
                  >
                    <Plus size={16} /> Add Card
                  </button>
                </div>
                <div className="space-y-6">
                  {profile.services.map((service, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => removeService(index)}
                          className="p-2 bg-red-950/20 hover:bg-red-950/60 border border-red-500/20 text-red-400 rounded-xl transition-all"
                          title="Delete Service"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 max-w-xl">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Service Card Title</label>
                          <input 
                            type="text" 
                            value={service.title}
                            onChange={(e) => updateService(index, 'title', e.target.value)}
                            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-colors font-bold text-cyan-300"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Short Description</label>
                          <textarea 
                            rows={2}
                            value={service.desc}
                            onChange={(e) => updateService(index, 'desc', e.target.value)}
                            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none text-sm text-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {profile.services.length === 0 && (
                    <p className="text-gray-500 italic text-center py-8">No services defined. Add one above!</p>
                  )}
                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold border-b border-white/10 pb-4 text-white">Contact & Social Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={profile.contact.email}
                      onChange={(e) => updateContactField('email', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      value={profile.contact.phone}
                      onChange={(e) => updateContactField('phone', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">GitHub Profile Link</label>
                    <input 
                      type="text" 
                      value={profile.contact.github}
                      onChange={(e) => updateContactField('github', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">LinkedIn Profile Link</label>
                    <input 
                      type="text" 
                      value={profile.contact.linkedin}
                      onChange={(e) => updateContactField('linkedin', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Instagram Profile Link</label>
                    <input 
                      type="text" 
                      value={profile.contact.instagram}
                      onChange={(e) => updateContactField('instagram', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Twitter / X Link</label>
                    <input 
                      type="text" 
                      value={profile.contact.twitter}
                      onChange={(e) => updateContactField('twitter', e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );

  // Quick Tab Helper Component
  function TabButton({ id, icon: Icon, label }) {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => {
          setActiveTab(id);
          setError('');
          setSuccess('');
        }}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap lg:whitespace-normal ${
          isActive 
            ? 'bg-gradient-to-r from-cyan-600/30 to-purple-600/30 text-cyan-300 border border-cyan-500/20' 
            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
        }`}
      >
        <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-gray-500'} />
        <span>{label}</span>
      </button>
    );
  }
}
