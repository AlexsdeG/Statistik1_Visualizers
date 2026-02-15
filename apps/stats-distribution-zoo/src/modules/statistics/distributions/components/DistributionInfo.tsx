import React from 'react';
import { useTranslation } from '../../../../i18n/translations';
import { DistributionType } from '../types';
import { MathRenderer } from './MathRenderer';

interface Props {
    type: DistributionType;
}

export const DistributionInfo: React.FC<Props> = ({ type }) => {
    const { t } = useTranslation();



    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">{t('info_header')}</h3>
            </div>
            <div className="p-6 space-y-6">

                {/* Definition */}
                <div>
                    <h4 className="text-sm font-bold text-blue-600 uppercase mb-2">{t(`dist_${type}`)}</h4>
                    <p className="text-gray-700 leading-relaxed">
                        {t(`def_${type}`)}
                    </p>
                </div>

                {/* Formula */}
                <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">{t('info_formula')}</h4>
                    <MathRenderer formula={t(`form_${type}`)} />
                </div>

                {/* Usage */}
                <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">{t('info_usage')}</h4>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700 italic">
                            {t(`usage_${type}`)}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};
