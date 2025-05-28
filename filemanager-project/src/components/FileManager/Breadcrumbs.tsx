import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  path: string;
  onNavigate: (path: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigate }) => {
  // Split the path and create breadcrumb items
  const getParts = () => {
    const parts = path.split('/').filter(Boolean);
    const result = [];
    let currentPath = '';

    // Add home
    result.push({
      name: 'Home',
      path: '/',
      isLast: parts.length === 0,
    });

    // Add each part with its cumulative path
    for (let i = 0; i < parts.length; i++) {
      currentPath += '/' + parts[i];
      result.push({
        name: parts[i],
        path: currentPath,
        isLast: i === parts.length - 1,
      });
    }

    return result;
  };

  const parts = getParts();

  return (
    <div className="flex items-center flex-wrap py-2 px-4 bg-white border-b text-sm">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex items-center ${
              part.isLast
                ? 'text-gray-800 font-medium'
                : 'text-blue-600 hover:underline cursor-pointer'
            }`}
            onClick={() => !part.isLast && onNavigate(part.path)}
          >
            {index === 0 ? (
              <Home className="h-3 w-3 mr-1" />
            ) : null}
            <span>{part.name}</span>
          </div>
          {!part.isLast && (
            <ChevronRight className="h-3 w-3 mx-2 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;