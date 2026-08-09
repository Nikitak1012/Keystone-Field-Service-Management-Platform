import React, { useState, useRef } from 'react';
import { XMarkIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import axios from 'axios'; // Assuming you use axios

interface ProjectSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string; // The Work Order ID / Project ID
}

const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({ isOpen, onClose, projectId }) => {
  const [formData, setFormData] = useState({
    sourceCodeLink: '',
    liveDeploymentLink: '',
    demoVideoLink: '',
    feedbackVideoLink: '',
  });
  
  // State for file uploads
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [sourceCodeFile, setSourceCodeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Create FormData to send files and text data
      const submitData = new FormData();
      submitData.append('projectId', projectId);
      submitData.append('sourceCodeLink', formData.sourceCodeLink);
      submitData.append('liveDeploymentLink', formData.liveDeploymentLink);
      submitData.append('demoVideoLink', formData.demoVideoLink);
      submitData.append('feedbackVideoLink', formData.feedbackVideoLink);
      
      if (reportFile) submitData.append('reportFile', reportFile);
      if (sourceCodeFile) submitData.append('sourceCodeFile', sourceCodeFile);

      // SEND TO BACKEND (We will build this endpoint next)
      // await axios.post('/api/projects/submit', submitData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });

      toast.success('Project submitted successfully!');
      onClose();
      // Reset form
      setFormData({
        sourceCodeLink: '',
        liveDeploymentLink: '',
        demoVideoLink: '',
        feedbackVideoLink: '',
      });
      setReportFile(null);
      setSourceCodeFile(null);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit project');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 text-2xl">ⓘ</span> How to submit your project
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* 1. Source Code */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">1. Source Code / Figma file</h3>
            <p className="text-sm text-gray-500 mb-3">GitHub/GitLab repo link, Drive folder, or upload your file.</p>
            
            <input 
              type="text" 
              name="sourceCodeLink"
              value={formData.sourceCodeLink}
              onChange={handleInputChange}
              placeholder="Paste URL here..."
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">OR</span>
              <input 
                type="file" 
                onChange={(e) => handleFileChange(e, setSourceCodeFile)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {sourceCodeFile && <span className="text-xs text-green-600">✓ {sourceCodeFile.name}</span>}
            </div>
          </div>

          {/* 2. Live Deployment */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">2. Live Deployment</h3>
            <p className="text-sm text-gray-500 mb-2">Public URL where your project is hosted.</p>
            <input 
              type="url" 
              name="liveDeploymentLink"
              value={formData.liveDeploymentLink}
              onChange={handleInputChange}
              placeholder="https://your-project.vercel.app"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 3. Demo Video */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">3. Demo Video</h3>
            <p className="text-sm text-gray-500 mb-2">YouTube (unlisted) or Drive link.</p>
            <input 
              type="url" 
              name="demoVideoLink"
              value={formData.demoVideoLink}
              onChange={handleInputChange}
              placeholder="Paste URL here..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 4. Feedback Video */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">4. Feedback Video</h3>
            <p className="text-sm text-gray-500 mb-2">Reflection on what you learned.</p>
            <input 
              type="url" 
              name="feedbackVideoLink"
              value={formData.feedbackVideoLink}
              onChange={handleInputChange}
              placeholder="Paste URL here..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 5. Project Report */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">5. Project Report</h3>
            <p className="text-sm text-gray-500 mb-2">Written documentation (PDF or Doc).</p>
            <div className="flex items-center gap-2">
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setReportFile)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {reportFile && <span className="text-xs text-green-600">✓ {reportFile.name}</span>}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isUploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProjectSubmissionModal;