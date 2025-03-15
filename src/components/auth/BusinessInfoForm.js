import React from "react";

const BusinessInfoForm = ({
  businessType,
  setBusinessType,
  businessName,
  setBusinessName,
}) => {
  return (
    <div>
      <div className="form-group">
        <label>사업자 유형:</label>
        <select
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
        >
          <option value="본점">본점</option>
          <option value="가맹점">가맹점</option>
          <option value="개인">개인</option>
        </select>
      </div>
      <div className="form-group">
        <label>사업장 이름:</label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default BusinessInfoForm;
