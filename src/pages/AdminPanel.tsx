import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface StudentProfile {
    _id: string;
    personality_type: string;
    skills: string[];
    career_paths: {
        title: string;
        match_score: number;
    }[];
    created_at: string;
}

const AdminPanel: React.FC = () => {
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/students');
                setStudents(response.data);
            } catch (err) {
                setError('Failed to load student data. Please try again.');
                console.error('Error fetching students:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const filteredStudents = students.filter(student =>
        student.personality_type.toLowerCase().includes(filter.toLowerCase()) ||
        student.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading student data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Student Recommendations</h2>
                <div className="w-64">
                    <input
                        type="text"
                        placeholder="Filter by personality type or skill..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="input-field"
                    />
                </div>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Personality Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Skills
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Top Career Matches
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr key={student._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(student.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                                            {student.personality_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {student.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            {student.career_paths.slice(0, 3).map((career) => (
                                                <div key={career.title} className="flex items-center">
                                                    <span className="text-sm text-gray-900">{career.title}</span>
                                                    <span className="ml-2 text-xs text-gray-500">
                                                        ({Math.round(career.match_score * 100)}% match)
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-sm text-gray-500 text-center">
                Showing {filteredStudents.length} of {students.length} students
            </div>
        </div>
    );
};

export default AdminPanel; 