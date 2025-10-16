import React from 'react';
interface SidebarProps {
  sections: {
    id: string;
    title: string;
  }[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  onSectionClick
}) => {
  return <aside className="w-64 bg-white shadow-md p-6 h-screen sticky top-0 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-800">LexiLaw</h2>
        <p className="text-sm text-blue-600">Project Report</p>
      </div>
      <nav>
        <ul className="space-y-2">
          {sections.map(section => <li key={section.id}>
              <button onClick={() => onSectionClick(section.id)} className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${activeSection === section.id ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-600 hover:bg-blue-50'}`}>
                {section.title}
              </button>
            </li>)}
        </ul>
      </nav>
    </aside>;
};
export default Sidebar;