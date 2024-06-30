import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="mx-auto">
      <div className="flex border-b border-gray-300 overflow-x-auto">
        {children.map(child => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? 'border-b-2 border-indigo-500 text-indigo-500 bg-gray-100' : 'text-gray-700'
            } flex flex-1 font-medium p-4 items-center justify-center gap-1 min-w-fit whitespace-nowrap`}
            onClick={e => handleClick(e, child.props.label)}
          >
            <span className="material-symbols-outlined">{child.props.icon}</span>
            <span className={`${activeTab === child.props.label ? '' : 'hidden sm:inline' }`}>{child.props.label}</span>
          </button>
        ))}
      </div>
      <div>
        {children.map(child => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, icon, children }) => {
  return (
    <div label={label} icon={icon} className="hidden">
      {children}
    </div>
  );
};
export { Tabs, Tab };