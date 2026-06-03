import React from 'react';
import WalletReportTable from './WalletReportTable';

const MainWallet = () => {
  // Sample data can be fetched or passed here
  const sampleData = []; 

  return (
    <WalletReportTable 
      title="Main Wallet Report" 
      data={sampleData} 
    />
  );
};

export default MainWallet;
