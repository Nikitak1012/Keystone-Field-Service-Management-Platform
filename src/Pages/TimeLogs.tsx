import { useState, ChangeEvent, FormEvent, useEffect } from 'react'; // Added useEffect
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Added axios import

const TimeLogs = () => {
  const { woNumber } = useParams(); 

  // 1. Use State for the dropdown list, initially empty
  const [assignedJobs, setAssignedJobs] = useState<{ id: string; title: string }[]>([]);

  // 2. Fetch the actual jobs from your backend when the page loads
  useEffect(() => {
    const fetchTimeLogJobs = async () => {
      try {
        const response = await axios.get('/api/work-orders');
        // Filter to only show jobs that are 'In Progress' OR 'Assigned'
        // Note: Check if your backend returns 'In Progress' or 'IN_PROGRESS' and adjust below
        const activeJobs = response.data.filter((job: any) => 
          job.status === 'IN_PROGRESS' || job.status === 'ASSIGNED'
        );
        setAssignedJobs(activeJobs);
      } catch (error) {
        console.error("Failed to fetch jobs for time logs", error);
      }
    };

    fetchTimeLogJobs();
  }, []);

  // 3. Set the initial form state
  const [formData, setFormData] = useState({
    // If woNumber exists in URL, use it. Otherwise, default to empty string until jobs load.
    workOrderId: woNumber || '', 
    scheduledDate: '',
    startTime: '',
    endTime: '',
    notes: ''
  });

  // 4. Whenever the fetched 'assignedJobs' list updates, 
  // if we don't have a workOrderId selected yet, automatically select the first one.
  useEffect(() => {
    if (assignedJobs.length > 0 && !formData.workOrderId) {
      setFormData(prev => ({ ...prev, workOrderId: assignedJobs[0].id }));
    }
  }, [assignedJobs]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => { 
    e.preventDefault();
    console.log("Scheduling submitted:", formData);
    alert("Work scheduled successfully!");
    // You would send this data to your backend here
  };

  return (
    <div className="flex-1 p-8 bg-white text-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Log / Schedule Time</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* SELECT WORK ORDER DROPDOWN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Work Order</label>
            <select 
              name="workOrderId" 
              value={formData.workOrderId}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-blue-500"
            >
              {/* Show a loading message if jobs haven't loaded yet */}
              {assignedJobs.length === 0 && (
                <option value="">Loading jobs...</option>
              )}
              
              {/* Map through the real API data */}
              {assignedJobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.id} - {job.title}
                </option>
              ))}
            </select>
          </div>

          {/* Scheduled Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Scheduled Date</label>
            <input 
              type="date" 
              name="scheduledDate" 
              value={formData.scheduledDate} 
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input 
                type="time" 
                name="startTime" 
                value={formData.startTime} 
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected End Time</label>
              <input 
                type="time" 
                name="endTime" 
                value={formData.endTime} 
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Notes / Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technician Notes</label>
            <textarea 
              name="notes" 
              rows={3} 
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any notes about the scheduled work..."
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-4"
          >
            Schedule Work
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimeLogs;