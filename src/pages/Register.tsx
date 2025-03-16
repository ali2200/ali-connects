
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, Check, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from '@/hooks/use-toast';

const Register = () => {
  const [accountType, setAccountType] = useState<'freelancer' | 'business' | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    agreeTerms: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to the Terms of Service",
        variant: "destructive",
      });
      return;
    }
    
    // TODO: Handle form submission
    console.log('Submitting registration form:', { accountType, ...formData });
    
    toast({
      title: "Registration Success",
      description: "Your account has been created successfully",
    });
    
    // Redirect to dashboard after successful registration
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20">
        <div className="container-custom max-w-4xl">
          <div className="glass-card shadow-card p-8 md:p-12">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Join Ali for Business to access marketing services, courses, and more.
              </p>
            </div>
            
            {step === 1 ? (
              <div className="animate-scale-in">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  What brings you to Ali for Business?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <button
                    type="button"
                    className={`flex flex-col items-center p-8 rounded-xl border-2 transition-all ${
                      accountType === 'freelancer' 
                        ? 'border-ali-blue bg-ali-blue/5 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setAccountType('freelancer')}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      accountType === 'freelancer' 
                        ? 'bg-ali-blue text-white' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <User className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">I'm a Freelancer</h3>
                    <p className="text-sm text-gray-600 text-center">
                      I want to offer my marketing services and find new clients
                    </p>
                    
                    {accountType === 'freelancer' && (
                      <div className="absolute top-4 right-4 text-ali-blue">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className={`flex flex-col items-center p-8 rounded-xl border-2 transition-all ${
                      accountType === 'business' 
                        ? 'border-ali-blue bg-ali-blue/5 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setAccountType('business')}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      accountType === 'business' 
                        ? 'bg-ali-blue text-white' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">I need marketing help</h3>
                    <p className="text-sm text-gray-600 text-center">
                      I'm looking to hire marketing expertise for my business
                    </p>
                    
                    {accountType === 'business' && (
                      <div className="absolute top-4 right-4 text-ali-blue">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!accountType}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            ) : (
              <div className="animate-scale-in">
                <button 
                  type="button" 
                  className="inline-flex items-center text-gray-600 hover:text-ali-blue mb-6"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ali-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ali-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ali-blue focus:border-transparent"
                    />
                  </div>
                  
                  {accountType === 'business' && (
                    <div className="mb-6">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ali-blue focus:border-transparent"
                      />
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password*
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ali-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password*
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ali-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="text-ali-blue hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-ali-blue hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isFullWidth
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-ali-blue hover:underline">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
