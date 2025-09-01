import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      style={{ marginLeft: '1rem', padding: '0.2rem 0.5rem', borderRadius: '5px' }}
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
}

export default LanguageSwitcher;
