import React, { useState } from "react";

function BankDetails({ bank }) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      onClick={() => setIsSelected(true)}
      key={bank?._id}
      className="border rounded-xl"
    >
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-wrap justify-between">
          <p className="font-semibold text-lg text-gray-400">{bank.bankName}</p>
          <p className="text-gray-300 text-sm">{bank.branchName}</p>
        </div>
        <p className="text-sm font-light tracking-widest">
          {"**********" + bank.accountNumber?.slice(-4)}
        </p>
        <p className="font-demo tracking-wide text-gray-400">
          {bank.accountHolderName}
        </p>
      </div>
    </div>
  );
}

export default BankDetails;
