import React from 'react';
import { X, ShieldCheck, Lock, Cpu, Globe } from 'lucide-react';
import { Language } from '../i18n/translations';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const content = {
    zh: {
      title: '隐私政策与数据安全声明',
      subtitle: '全站 100% 本地浏览器端实时计算 · 零隐私追踪 Guarantee',
      sec1Title: '1. 本地计算保障 (Client-Side Privacy)',
      sec1Desc: '本工具所有的方程解析、配方法步骤计算、图形渲染均 100% 在您的本地浏览器中直接运行。您的数学输入与方程数据不会被传输、上传或存储至任何外部服务器。',
      sec2Title: '2. 无追踪 Cookie (No Tracking Cookies)',
      sec2Desc: '我们不使用任何跨站追踪 Cookie、广告 Cookie 或个人身份识别技术。全站符合 GDPR 及 CCPA 隐私防护标准。',
      sec3Title: '3. 免费开源与学术使用',
      sec3Desc: '本工具面向全世界教师、学生与数学爱好者永久免费提供，无任何强制注册与弹窗广告。',
      close: '关闭',
    },
    en: {
      title: 'Privacy Policy & Data Security',
      subtitle: '100% Local Client-Side Calculation · Zero Privacy Tracking Guarantee',
      sec1Title: '1. Client-Side Local Calculation',
      sec1Desc: 'All equation parsing, completing the square algebra, and coordinate graphing occur 100% locally inside your web browser. Your inputs are never transmitted, logged, or saved on any server.',
      sec2Title: '2. No Tracking Cookies',
      sec2Desc: 'We do not use persistent advertising cookies, cross-site tracking, or telemetry scripts. Fully compliant with GDPR & CCPA privacy standards.',
      sec3Title: '3. Open Academic Access',
      sec3Desc: 'Permanently free for students, educators, and STEM researchers worldwide without mandatory registration.',
      close: 'Close',
    },
    es: {
      title: 'Política de Privacidad y Seguridad',
      subtitle: 'Cálculo 100% Local en su Navegador · Garantía de Cero Rastreos',
      sec1Title: '1. Procesamiento Local en el Cliente',
      sec1Desc: 'Todo el cálculo y la representación gráfica se ejecutan 100% en su propio navegador. Sus datos no se envían a ningún servidor externo.',
      sec2Title: '2. Sin Cookies de Rastreos',
      sec2Desc: 'No utilizamos cookies de seguimiento publicitario ni análisis invasivos. Cumple con los estándares GDPR y CCPA.',
      sec3Title: '3. Acceso Académico Libre',
      sec3Desc: 'Totalmente gratuito para profesores, estudiantes y usuarios académicos de todo el mundo.',
      close: 'Cerrar',
    },
    fr: {
      title: 'Politique de Confidentialité',
      subtitle: 'Calcul 100% Local · Aucune Collecte de Données',
      sec1Title: '1. Calcul Local dans le Navigateur',
      sec1Desc: 'Toutes les opérations et le tracé des courbes s\'exécutent localement dans votre navigateur. Aucune donnée n\'est envoyée sur un serveur.',
      sec2Title: '2. Absence de Cookies Invasifs',
      sec2Desc: 'Nous n\'utilisons aucun cookie publicitaire ou de suivi intersite. Conforme aux exigences du RGPD.',
      sec3Title: '3. Usage Académique Libre',
      sec3Desc: 'Accessible gratuitement pour les élèves, enseignants et passionnés de mathématiques.',
      close: 'Fermer',
    },
    pt: {
      title: 'Política de Privacidade e Segurança',
      subtitle: 'Processamento 100% Local no Navegador · Sem Rastreamento',
      sec1Title: '1. Processamento Local',
      sec1Desc: 'Todos os cálculos e gráficos acontecem 100% no seu navegador. Nenhuma equação é transmitida ou salva em servidores externos.',
      sec2Title: '2. Sem Cookies de Rastreio',
      sec2Desc: 'Não utilizamos cookies de anúncios nem scripts de rastreamento. Em conformidade com GDPR e LGPD.',
      sec3Title: '3. Acesso Acadêmico Gratuito',
      sec3Desc: 'Gratuito e livre para alunos e professores em todo o mundo.',
      close: 'Fechar',
    },
  }[lang] || {
    title: 'Privacy Policy & Data Security',
    subtitle: '100% Local Client-Side Calculation · Zero Privacy Tracking Guarantee',
    sec1Title: '1. Client-Side Local Calculation',
    sec1Desc: 'All equation parsing, completing the square algebra, and coordinate graphing occur 100% locally inside your web browser. Your inputs are never transmitted, logged, or saved on any server.',
    sec2Title: '2. No Tracking Cookies',
    sec2Desc: 'We do not use persistent advertising cookies, cross-site tracking, or telemetry scripts. Fully compliant with GDPR & CCPA privacy standards.',
    sec3Title: '3. Open Academic Access',
    sec3Desc: 'Permanently free for students, educators, and STEM researchers worldwide without mandatory registration.',
    close: 'Close',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5 mb-5 pr-8">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 mt-0.5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {content.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {content.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-600" />
              {content.sec1Title}
            </h4>
            <p>{content.sec1Desc}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-600" />
              {content.sec2Title}
            </h4>
            <p>{content.sec2Desc}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              {content.sec3Title}
            </h4>
            <p>{content.sec3Desc}</p>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              {content.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
