import React from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MessageSquare,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ExternalLink,
  Download,
  UserPlus,
  QrCode,
  MapPin,
  Globe,
  BadgeCheck
} from "lucide-react";
import avenueLogo from "../assets/company/AvenueProperties.png";
import omarImage from "../assets/omar-hassan.webp";

const BusinessCard = () => {
  const contactInfo = {
    name: "Omar Hassan",
    title: "Marketing Manager",
    company: "The Avenue Properties",
    companyLogo: avenueLogo,
    phone: "+201204564527",
    email: "omerhassan@theavenueeg.com",
    website: "theavenueeg.com",
    location: "Sheikh Zayed, Egypt"
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/omar.tnzxo",
      color: "bg-blue-600",
      description: "Follow us on Facebook"
    },
    {
      name: "Instagram", 
      icon: Instagram,
      url: "https://instagram.com/omar.tnzxo",
      color: "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500",
      description: "Follow us on Instagram"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/omar.tnzxo",
      color: "bg-blue-700",
      description: "Connect on LinkedIn"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/omar.tnzxo",
      color: "bg-blue-400",
      description: "Follow on Twitter"
    }
  ];

  const handleContact = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`, '_self');
        break;
      case 'email':
        window.open(`mailto:${value}`, '_self');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${value.replace('+', '')}`, '_blank');
        break;
      case 'message':
        window.open(`mailto:${contactInfo.email}`, '_self');
        break;
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleAddToContacts = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:${contactInfo.company}
TEL:${contactInfo.phone}
EMAIL:${contactInfo.email}
URL:${contactInfo.website}
ADR:;;${contactInfo.location}
END:VCARD`;
    
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactInfo.name.replace(' ', '_')}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Section - Profile & Info */}
        <div className="lg:w-2/3 relative">
          {/* Hero Section with Image */}
          <div className="relative h-80 lg:h-full min-h-[500px] overflow-hidden">
            <img
              src={omarImage}
              alt={contactInfo.name}
              className="w-full h-full object-cover"
            />
            
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 via-black/60 via-black/30 to-transparent"></div>
            
            {/* Additional Text Shadow Layer */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>

            {/* Profile Info */}
            <div className="absolute bottom-6 left-6 right-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                    {contactInfo.name}
                  </h1>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <BadgeCheck className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                    </div>
                  </motion.div>
                </div>
                
                                    <div className="flex items-center space-x-3">
                      <img
                        src={contactInfo.companyLogo}
                        alt={contactInfo.company}
                        className="w-8 h-8 object-contain"
                      />
                      <div>
                        <p className="text-white/90 text-sm lg:text-base font-medium">
                          {contactInfo.title}
                        </p>
                        <p className="text-white/70 text-xs lg:text-sm">
                          {contactInfo.company}
                        </p>
                      </div>
                    </div>

                <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-md">
                  Marketing & Development Specialist | Real Estate Consultant | Business Solutions Expert
                </p>

                {/* Direct Contact Information */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2 text-white/90">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">{contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/90">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">{contactInfo.email}</span>
                  </div>
                </div>

                {/* Interactive Location & Website Icons */}
                <div className="flex items-center space-x-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(`https://maps.google.com/?q=${contactInfo.location}`, '_blank')}
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
                    title={contactInfo.location}
                  >
                    <MapPin className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(`https://${contactInfo.website}`, '_blank')}
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
                    title={contactInfo.website}
                  >
                    <Globe className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Section - Interactive Elements */}
        <div className="lg:w-1/3 bg-white/5 backdrop-blur-sm p-6 space-y-6">
          {/* Contact Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-white/90 text-lg font-semibold">Get in Touch</h3>
            
            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContact('phone', contactInfo.phone)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Call</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContact('email', contactInfo.email)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Email</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContact('whatsapp', contactInfo.phone)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">WhatsApp</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContact('message', contactInfo.email)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-red-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Message</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <h3 className="text-white/90 text-lg font-semibold">Social Media Accounts</h3>
            
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSocialClick(social.url)}
                  className="flex items-center justify-between p-3 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-200 border border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${social.color}`}>
                      <social.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {social.name}
                      </p>
                      <p className="text-white/60 text-xs">
                        {social.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/60" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-3 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToContacts}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add to Contacts</span>
            </motion.button>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center space-x-2 bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <QrCode className="w-4 h-4" />
                <span className="text-sm">QR Code</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToContacts}
                className="flex-1 flex items-center justify-center space-x-2 bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard; 