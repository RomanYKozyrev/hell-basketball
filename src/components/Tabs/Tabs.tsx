import React from 'react';

const tabsList = ['Players', 'Games'];

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ activeTab, setActiveTab }: Props) => {
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setActiveTab(target.name);
  };

  return (
    <ul className="tabs">
      {tabsList.map((tab) => (
        <li key={tab} className="tabs-item">
          <button
            className={`tabs-item-btn ${activeTab === tab && 'active'}`}
            name={tab}
            onClick={handleTabClick}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
