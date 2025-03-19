"use client"
import { useState } from 'react';

export default function Home() {
  const [diameter, setDiameter] = useState('');
  const [depth, setDepth] = useState('');
  const [focalPoint, setFocalPoint] = useState(null);
  const [armLength, setArmLength] = useState(null);
  const [error, setError] = useState(null);

  const calculateFocalPointAndArmLength = () => {
    setError(null);
    setFocalPoint(null);
    setArmLength(null);

    if (!diameter && !depth) {
      setError('Both diameter and depth are required.');
      return;
    }
    else if (!diameter) {
      setError('Diameter is required.');
      return;
    }
    else if (!depth) {
      setError('Depth is required.');
      return;
    }

    const d = parseFloat(diameter);
    const h = parseFloat(depth);

    if (isNaN(d) || isNaN(h) || d <= 0 || h <= 0) {
      setError('Please enter valid positive numbers for diameter and depth.');
      return;
    }

    // Calculate focal point
    const focal = (d * d) / (16 * h);
    setFocalPoint(focal.toFixed(2));

    // Calculate arm length (radius of the dish)
    const radius = (d / 2)-1.5;
    setArmLength(radius.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Dish LNB Focal Point & Arm Length Calculator</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-md text-center">
            {error}
          </div>
        )}

        <label htmlFor="diameter" className="block mb-2 font-medium">
          Diameter (D):
        </label>
        <input
          id="diameter"
          type="number"
          placeholder="Enter diameter in inches"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label htmlFor="depth" className="block mb-2 font-medium">
          Depth (H):
        </label>
        <input
          id="depth"
          type="number"
          placeholder="Enter depth in inches"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={calculateFocalPointAndArmLength}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-md font-bold text-white transition duration-200"
        >
          Calculate Focal Point and Arm Length
        </button>

        {focalPoint && (
          <div className="mt-4 p-3 font-bold bg-green-600 rounded-md text-center">
            Focal Point: {focalPoint} inches
          </div>
        )}

        {armLength && (
          <div className="mt-4 p-3 font-bold bg-yellow-600 rounded-md text-center">
            Arm Length (approx): {armLength} inches
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold mt-6 text-center">Designed and Developed by <span className='text-yellow-200'>Bukhari Cable Network</span></h1>
      <h1 className="text-lg text-yellow-400 font-bold text-center">Arshad Bukhari (0301-8430966)</h1>
    </div>
  );
}
