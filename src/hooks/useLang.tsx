import { createContext, useContext, useState, useCallback } from "react";

type Lang = "en" | "cn" | "fr";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_work: "Work",
    nav_contact: "Contact",
    nav_cta: "Book a Call",

    // Hero
    hero_asterisk: "✽",
    hero_label: "AI Deployment Studio",
    hero_tagline: "AI Integration Studio",
    hero_line1: "Deploy AI.",
    hero_line2: "Move faster.",
    hero_desc: "Most teams use AI at 10% of its potential. We find the friction, build the agents, and deploy them directly into your stack.",
    hero_subtitle: "We build, deploy, and manage AI agents and automations so your team moves faster — without expanding headcount.",
    hero_cta: "Start with an audit",
    hero_explore: "Explore Capabilities",

    // Use Cases (WHERE WE HELP)
    usecases_label: "Where We Help",
    usecases_heading: "Your team, amplified",
    usecases_subtitle: "Off-the-shelf where it works. Custom agents where it does not. Deployed into BD, Sales, Ops, Marketing, and Product.",
    "uc_bd_pain": "An autonomous scheduling AI agent researches across regions, preps outreach, handles email responses, and drafts agreements. Your team sells instead of admin-ing.",
    "uc_sales_pain": "Reps lose hours to research and admin. AI handles prep work so they sell more and type less.",
    "uc_cs_pain": "A self-learning agent embeds with your team's knowledge, reduces tickets by 20%, and responds in under 5 minutes.",
    "uc_ops_pain": "An ops agent syncs logic across all functions, keeps teams aligned, and delivers daily intelligence without meetings.",
    "uc_marketing_pain": "Every campaign needs variations and wraps. AI handles production so strategy stays human.",
    "uc_product_pain": "AI agents handle competitive research, documentation, and ticket triage so teams ship 2x faster — even remotely.",
    "uc_bd_tag": "Autonomous outreach",
    "uc_bd_name": "BD & Prospecting",
    "uc_sales_tag": "More selling",
    "uc_sales_name": "Sales",
    "uc_cs_tag": "Faster resolution",
    "uc_cs_name": "Customer Success",
    "uc_ops_tag": "Cross-functional sync",
    "uc_ops_name": "Operations",
    "uc_marketing_tag": "Scale output",
    "uc_marketing_name": "Marketing",
    "uc_product_tag": "Ship faster",
    "uc_product_name": "Product & Engineering",

    research_stats_label: "The Numbers",
    research_stats_heading: "Why this matters",
    stat_1_label: "Added to global GDP by 2030",
    stat_2_label: "Productivity uplift from AI teams",
    stat_3_label: "Of SMEs have no AI strategy",
    stat_4_label: "Reduction in back-office time",
    stat_5_label: "Of AI projects never ship",
    stat_6_label: "Typical payback period",

    // Research
    research_label: "Research & Discovery",
    research_heading: "Before we build, we understand",
    research_subtitle: "We start with your team, not a template. We map what hurts and what actually moves the needle.",
    research_step1_label: "Audit",
    research_step1_title: "We listen first",
    research_step1_text: "2-hour workshop. We map your existing tools, workflows, and pain points. We identify where AI actually saves time versus where it adds complexity.",
    research_step2_label: "Analysis",
    research_step2_title: "We surface what you miss",
    research_step2_text: "We review process data, tool usage, and team feedback. We identify friction points, automation gaps, and where a single agent can replace 3 tools.",
    research_step3_label: "Strategy",
    research_step3_title: "We deliver the plan",
    research_step3_text: "Clear priorities. Specific tools. Realistic timelines. We tell you exactly what to build, what to buy, and what to ignore.",

    // Social Proof
    clients_label: "Clients",
    clients_heading: "Real teams. Real results.",
    clients_subtitle: "Specific teams. Specific wins. No fluff.",
    client_nichesim_story: "An autonomous scheduling AI agent conducted research across 14 regions, pulled accurate data into their CRM, prepped outreach, and handled email responses plus MSA/agreement drafting and review. Full end-to-end BD automation.",
    client_nichesim_outcome: ">8 hours saved per week. 3x BD productivity without expanding the team.",
    client_nichesim_name: "NicheSim",
    client_nichesim_tag: "BD & Prospecting",
    client_nichesim_metrics: "3x BD growth,>8h/week saved,14 regions",

    client_gaib_story: "Agents and automations for deep competitive research on and off-chain. Every morning each party received curated intelligence straight into their inbox. Internally, an ops agent synced logic across all functions and kept the team aligned without meetings.",
    client_gaib_outcome: "Hours of research saved per week. Deep competitive intelligence delivered every morning.",
    client_gaib_name: "GAIB",
    client_gaib_tag: "Competitive Research & Ops",
    client_gaib_metrics: "Daily intel,Off-chain research,Cross-functional sync",

    client_confidential_story: "We developed and implemented Hermes, a self-learning agent that grew and embedded itself with the team's knowledge. It reduced tickets by 20% and increased responsiveness by 30% with average response time under 5 minutes. Developers worked cohesively while remote, and product + sales shipped to market 2x faster than initially planned.",
    client_confidential_outcome: "20% ticket reduction. 30% faster response times. GTM 2x faster than planned.",
    client_confidential_name: "Confidential — Enterprise SaaS",
    client_confidential_tag: "Customer Success & Engineering",
    client_confidential_metrics: "20% fewer tickets,<5 min response,2x faster GTM",

    // Approach
    approach_label: "How We Work",
    approach_heading: "Built. Deployed. Running.",
    approach_subtitle: "We do not sell hours. We sell outcomes. Every engagement is scoped, tracked, and measured against real business metrics.",
    approach_step1_label: "01",
    approach_step1_title: "Map",
    approach_step1_text: "We find the tasks that eat time and the information that goes missing.",
    approach_step2_label: "02",
    approach_step2_title: "Design",
    approach_step2_text: "We pick the right tools for your workflow. Custom agents when nothing off-the-shelf fits.",
    approach_step3_label: "03",
    approach_step3_title: "Deploy",
    approach_step3_text: "Everything goes live in your existing stack. No new platforms to learn.",
    approach_step4_label: "04",
    approach_step4_title: "Optimise",
    approach_step4_text: "We stay close, refine, and make sure your investment keeps compounding.",

    // Capabilities
    capabilities_label: "What We Build",
    capabilities_heading: "Find the friction. Remove it.",
    capabilities_subtitle: "Every tool is chosen for the problem. Nothing is built for the sake of building.",
    cap_1_title: "Workflow Audit",
    cap_1_desc: "We map where your teams lose time. The handoffs, the repetition, the work nobody talks about anymore.",
    cap_2_title: "AI Strategy & Tool Selection",
    cap_2_desc: "We match the right AI tools to your actual problems. When nothing off-the-shelf fits, we build custom agents that do.",
    cap_3_title: "Implementation",
    cap_3_desc: "We embed directly into your stack. Your teams see results where they already work. That is the standard.",

    // Pricing
    pricing_label: "Pricing",
    pricing_heading: "One price. Full coverage.",
    pricing_subtitle: "A forward deployment studio for less than a senior hire. Unsubscribe anytime after the initial deployment phase — come back whenever you need us.",
    pricing_annual_heading: "$8,000 / month",
    pricing_annual_badge: "Annual",
    pricing_annual_note: "2-month minimum commitment. Pause or cancel anytime after.",
    pricing_monthly_heading: "$10,000 / month",
    pricing_monthly_badge: "Monthly",
    pricing_monthly_note: "Same coverage. Full flexibility. No long-term lock-in.",
    pricing_includes: "Includes",
    pricing_include_1: "Full workflow audit",
    pricing_include_2: "AI strategy & tool selection",
    pricing_include_3: "Implementation into your systems",
    pricing_include_4: "Custom agents & automations",
    pricing_include_5: "Unlimited access to our team",
    pricing_include_6: "Monthly performance review",
    pricing_include_7: "Unsubscribe anytime after initial deployment",
    pricing_cta: "Get started",
    pricing_book: "or book a 15-min call",
    pricing_caveat: "Need something custom?",

    // Contact
    contact_label: "Contact",
    contact_heading: "Ready when you are",
    contact_subtitle: "No sales pitch. A 30-minute diagnostic. We tell you exactly what is worth building.",
    contact_email_label: "Email",
    contact_phone_label: "Phone",
    contact_form_name: "Name",
    contact_form_email: "Email",
    contact_form_message: "What are you trying to solve?",
    contact_form_submit: "Send message",
    contact_form_privacy: "No spam. We reply within 24 hours.",

    // Footer
    footer_brand: "A better team. Backed by AI.",
    footer_links: "Company",
    footer_link_home: "Home",
    footer_link_work: "Work",
    footer_link_contact: "Contact",
    footer_copyright: "© 2025 Attiteud. All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",

    // Language toggle
    lang_en: "EN",
    lang_cn: "中",
    lang_fr: "FR",
  },
  cn: {
    // Navigation
    nav_home: "首页",
    nav_work: "服务",
    nav_contact: "联系",
    nav_cta: "预约通话",

    // Hero
    hero_asterisk: "✽",
    hero_label: "AI 部署工作室",
    hero_tagline: "AI 集成工作室",
    hero_line1: "部署 AI。",
    hero_line2: "加速运转。",
    hero_desc: "大多数团队只用了 AI 10% 的潜力。我们找出摩擦点，构建智能体，直接部署到您的技术栈中。",
    hero_subtitle: "我们构建、部署和管理 AI 智能体与自动化，让您的团队无需扩编即可加速运转。",
    hero_cta: "开始审计",
    hero_explore: "探索能力",

    // Use Cases (WHERE WE HELP)
    usecases_label: "我们服务哪些领域",
    usecases_heading: "团队能力倍增",
    usecases_subtitle: "能用现成工具就用，不行就定制智能体。部署于商务拓展、销售、运营、营销和产品团队。",
    "uc_bd_pain": "自主调度 AI 智能体跨地区调研，准备推广方案，处理邮件回复并起草协议。您的团队专注销售，不用再做行政杂务。",
    "uc_sales_pain": "销售花大量时间在调研和行政上。AI 处理准备工作，让他们卖更多，打字更少。",
    "uc_cs_pain": "自学习智能体嵌入团队知识库，减少 20% 工单量，响应时间低于 5 分钟。",
    "uc_ops_pain": "运营智能体同步所有职能部门逻辑，保持团队对齐，无需会议即可每日推送情报。",
    "uc_marketing_pain": "每个活动都需要变体和包装。AI 处理制作，策略保持人性化。",
    "uc_product_pain": "AI 智能体处理竞品调研、文档和工单分类，让团队速度翻倍——即使远程办公。",
    "uc_bd_tag": "自主推广",
    "uc_bd_name": "商务拓展与潜在客户开发",
    "uc_sales_tag": "更多销售",
    "uc_sales_name": "销售",
    "uc_cs_tag": "更快响应",
    "uc_cs_name": "客户成功",
    "uc_ops_tag": "跨职能同步",
    "uc_ops_name": "运营",
    "uc_marketing_tag": "规模化产出",
    "uc_marketing_name": "营销",
    "uc_product_tag": "更快交付",
    "uc_product_name": "产品与工程",

    research_stats_label: "数据",
    research_stats_heading: "为什么重要",
    stat_1_label: "到2030年将增加全球GDP",
    stat_2_label: "AI团队的生产力提升",
    stat_3_label: "的中小企业没有AI战略",
    stat_4_label: "后台办公时间减少",
    stat_5_label: "的AI项目从未上线",
    stat_6_label: "典型回报周期",

    // Research
    research_label: "调研与发现",
    research_heading: "先理解，再构建",
    research_subtitle: "我们从您的团队出发，而非模板。我们梳理痛点和真正影响业务的环节。",
    research_step1_label: "审计",
    research_step1_title: "先倾听",
    research_step1_text: "2 小时工作坊。我们梳理现有工具、流程和痛点。识别 AI 真正节省时间的地方，而非增加复杂度的环节。",
    research_step2_label: "分析",
    research_step2_title: "发现您遗漏的",
    research_step2_text: "我们审查流程数据、工具使用情况和团队反馈。找出摩擦点、自动化缺口，以及一个智能体可以替代三个工具的地方。",
    research_step3_label: "策略",
    research_step3_title: "交付方案",
    research_step3_text: "清晰的优先级。具体的工具。可行的时间线。我们明确告诉您该自建什么、该采购什么、该忽略什么。",

    // Social Proof
    clients_label: "客户",
    clients_heading: "真实团队。真实成果。",
    clients_subtitle: "具体团队。具体突破。没有空话。",
    client_nichesim_story: "自主调度 AI 智能体跨 14 个地区进行调研，将精准数据拉入 CRM，准备推广方案，处理邮件回复并起草/审核 MSA 协议。端到端商务拓展全自动化。",
    client_nichesim_outcome: "每周节省 8 小时以上。商务拓展生产力提升 3 倍，无需扩编。",
    client_nichesim_name: "NicheSim",
    client_nichesim_tag: "商务拓展与潜在客户开发",
    client_nichesim_metrics: "3倍BD增长,每周省8小时+,14个地区",

    client_gaib_story: "智能体和自动化深入链上链下竞争调研。每天早上各方邮箱收到精选情报。内部运营智能体同步所有职能部门逻辑，无需会议保持团队对齐。",
    client_gaib_outcome: "每周节省数小时研究时间。深度竞争情报每日送达。",
    client_gaib_name: "GAIB",
    client_gaib_tag: "竞争调研与运营",
    client_gaib_metrics: "每日情报,链下研究,跨职能同步",

    client_confidential_story: "我们开发并实施了 Hermes 自学习智能体，它融入团队知识并持续成长。减少 20% 工单量，响应速度提升 30%，平均响应时间低于 5 分钟。开发人员远程也能高效协作，产品和销售团队以计划两倍的速度推向市场。",
    client_confidential_outcome: "工单减少 20%。响应速度提升 30%。上市速度是计划的两倍。",
    client_confidential_name: "机密客户 — 企业级SaaS",
    client_confidential_tag: "客户成功与工程",
    client_confidential_metrics: "工单减少20%,<5分钟响应,上市速度2倍",

    // Approach
    approach_label: "工作方式",
    approach_heading: "我们的工作方式",
    approach_subtitle: "我们不卖工时，我们卖结果。每项合作都有范围、追踪和基于真实业务指标的衡量。",
    approach_step1_label: "01",
    approach_step1_title: "梳理",
    approach_step1_text: "我们找出消耗时间的任务和流失的信息。",
    approach_step2_label: "02",
    approach_step2_title: "设计",
    approach_step2_text: "我们为您的流程选择正确的工具。没有现成方案时，我们构建定制智能体。",
    approach_step3_label: "03",
    approach_step3_title: "部署",
    approach_step3_text: "所有内容在您的现有技术栈中上线。无需学习新平台。",
    approach_step4_label: "04",
    approach_step4_title: "优化",
    approach_step4_text: "我们保持紧密合作，持续优化，确保您的投资不断产生复利效应。",

    // Capabilities
    capabilities_label: "我们构建什么",
    capabilities_heading: "找出摩擦点。消除它。",
    capabilities_subtitle: "每个工具都为问题而生。不为构建而构建。",
    cap_1_title: "工作流审计",
    cap_1_desc: "我们梳理团队时间的流失点。交接环节、重复工作、那些没人再提起的事务。",
    cap_2_title: "AI 策略与工具选择",
    cap_2_desc: "我们为您的实际问题匹配正确的 AI 工具。没有现成方案时，我们构建定制智能体。",
    cap_3_title: "实施部署",
    cap_3_desc: "我们直接嵌入您的技术栈。团队在他们工作的地方看到成果。这就是标准。",

    // Pricing
    pricing_label: "定价",
    pricing_heading: "一个价格，全面覆盖",
    pricing_subtitle: "一个资深员工不到的成本，获得完整的部署工作室。初始部署后随时取消——需要时再回来。",
    pricing_annual_heading: "$8,000 / 月",
    pricing_annual_badge: "年付",
    pricing_annual_note: "至少承诺 2 个月。之后可暂停或取消。",
    pricing_monthly_heading: "$10,000 / 月",
    pricing_monthly_badge: "月付",
    pricing_monthly_note: "同等覆盖。完全灵活。无长期绑定。",
    pricing_includes: "包含",
    pricing_include_1: "完整工作流审计",
    pricing_include_2: "AI 策略与工具选择",
    pricing_include_3: "集成到您的系统",
    pricing_include_4: "定制智能体与自动化",
    pricing_include_5: "无限团队访问权限",
    pricing_include_6: "每月绩效回顾",
    pricing_include_7: "初始部署后随时取消",
    pricing_cta: "开始合作",
    pricing_book: "或预约 15 分钟通话",
    pricing_caveat: "需要定制方案？",

    // Contact
    contact_label: "联系",
    contact_heading: "随时恭候",
    contact_subtitle: "没有推销。30 分钟诊断。我们直告诉您什么值得构建。",
    contact_email_label: "邮箱",
    contact_phone_label: "电话",
    contact_form_name: "姓名",
    contact_form_email: "邮箱",
    contact_form_message: "您想解决什么问题？",
    contact_form_submit: "发送消息",
    contact_form_privacy: "不发垃圾邮件。我们 24 小时内回复。",

    // Footer
    footer_brand: "更强大的团队。AI 驱动。",
    footer_links: "公司",
    footer_link_home: "首页",
    footer_link_work: "服务",
    footer_link_contact: "联系",
    footer_copyright: "© 2025 Attiteud. 保留所有权利。",
    footer_privacy: "隐私政策",
    footer_terms: "服务条款",

    // Language toggle
    lang_en: "EN",
    lang_cn: "中",
    lang_fr: "FR",
  },
  fr: {
    // Navigation
    nav_home: "Accueil",
    nav_work: "Services",
    nav_contact: "Contact",
    nav_cta: "Réserver un Appel",

    // Hero
    hero_asterisk: "✽",
    hero_label: "Studio de Déploiement IA",
    hero_tagline: "Studio d'Intégration IA",
    hero_line1: "Déployez l'IA.",
    hero_line2: "Accélérez.",
    hero_desc: "La plupart des équipes utilisent l'IA à 10% de son potentiel. Nous identifions les frictions, construisons les agents et les déployons dans votre stack.",
    hero_subtitle: "Nous construisons, déployons et gérons des agents et automatisations IA pour accélérer votre équipe — sans embaucher.",
    hero_cta: "Commencer par un audit",
    hero_explore: "Explorer les Capacités",

    // Use Cases (WHERE WE HELP)
    usecases_label: "Où Nous Intervenons",
    usecases_heading: "Votre équipe, amplifiée",
    usecases_subtitle: "Outils existants quand ça marche. Agents sur mesure quand ça ne marche pas. Déployés dans le BD, les Ventes, les Opérations, le Marketing et le Produit.",
    "uc_bd_pain": "Un agent IA autonome effectue des recherches dans plusieurs régions, prépare les campagnes, gère les réponses email et rédige les accords. Votre équipe vend au lieu de faire de l'administratif.",
    "uc_sales_pain": "Les commerciaux perdent des heures en recherche et administration. L'IA gère la préparation pour qu'ils vendent plus et tapent moins.",
    "uc_cs_pain": "Un agent auto-apprenant intègre les connaissances de votre équipe, réduit les tickets de 20% et répond en moins de 5 minutes.",
    "uc_ops_pain": "Un agent opérationnel synchronise la logique entre toutes les fonctions, maintient l'alignement de l'équipe et fournit des informations quotidiennes sans réunions.",
    "uc_marketing_pain": "Chaque campagne nécessite des variantes et des habillages. L'IA gère la production pour que la stratégie reste humaine.",
    "uc_product_pain": "Des agents IA gèrent la recherche concurrentielle, la documentation et le triage des tickets pour que les équipes livrent 2x plus vite — même à distance.",
    "uc_bd_tag": "Développement autonome",
    "uc_bd_name": "Développement & Prospection",
    "uc_sales_tag": "Plus de ventes",
    "uc_sales_name": "Ventes",
    "uc_cs_tag": "Résolution rapide",
    "uc_cs_name": "Service Client",
    "uc_ops_tag": "Synchronisation transversale",
    "uc_ops_name": "Opérations",
    "uc_marketing_tag": "Production massive",
    "uc_marketing_name": "Marketing",
    "uc_product_tag": "Livraison accélérée",
    "uc_product_name": "Produit & Ingénierie",


    research_label: "Recherche & Découverte",
    research_heading: "Avant de construire, nous comprenons",
    research_subtitle: "Nous partons de votre équipe, pas d'un modèle. Nous cartographions ce qui fait mal et ce qui impacte réellement le business.",
    research_step1_label: "Audit",
    research_step1_title: "Nous écoutons d'abord",
    research_step1_text: "Atelier de 2 heures. Nous cartographions vos outils existants, flux de travail et points de friction. Nous identifions où l'IA gagne réellement du temps versus où elle ajoute de la complexité.",
    research_step2_label: "Analyse",
    research_step2_title: "Nous révélons ce que vous manquez",
    research_step2_text: "Nous examinons les données de processus, l'utilisation des outils et les retours de l'équipe. Nous identifions les points de friction, les lacunes d'automatisation et où un seul agent peut remplacer 3 outils.",
    research_step3_label: "Stratégie",
    research_step3_title: "Nous livrons le plan",
    research_step3_text: "Priorités claires. Outils spécifiques. Délais réalistes. Nous vous disons exactement quoi construire, quoi acheter et quoi ignorer.",

    // Social Proof
    clients_label: "Clients",
    clients_heading: "Équipes réelles. Résultats réels.",
    clients_subtitle: "Équipes spécifiques. Victoires spécifiques. Pas de bla-bla.",
    client_nichesim_story: "Un agent IA autonome a effectué des recherches dans 14 régions, extrait des données précises dans le CRM, préparé les campagnes et géré les réponses email ainsi que la rédaction et révision des accords MSA. Automatisation BD de bout en bout.",
    client_nichesim_outcome: ">8 heures économisées par semaine. Productivité BD x3 sans embauche.",
    client_nichesim_name: "NicheSim",
    client_nichesim_tag: "Développement & Prospection",
    client_nichesim_metrics: "3x croissance BD,>8h/sem. économisées,14 régions",

    client_gaib_story: "Des agents et automatisations pour une recherche concurrentielle approfondie on-chain et off-chain. Chaque matin, les parties reçoivent des informations sélectionnées directement dans leur boîte mail. Un agent opérationnel synchronise la logique entre toutes les fonctions sans réunions.",
    client_gaib_outcome: "Des heures de recherche économisées par semaine. Renseignements concurrentiels approfondis chaque matin.",
    client_gaib_name: "GAIB",
    client_gaib_tag: "Recherche Concurrentielle & Opérations",
    client_gaib_metrics: "Intel quotidien,Recherche off-chain,Synchronisation transversale",

    client_confidential_story: "Nous avons développé et déployé Hermes, un agent auto-apprenant qui s'intègre et croît avec les connaissances de l'équipe. Réduction de 20% des tickets, augmentation de 30% de la réactivité avec un temps de réponse moyen sous 5 minutes. Les développeurs collaborent efficacement à distance, et les équipes produit + ventes livrent sur le marché 2x plus vite que prévu.",
    client_confidential_outcome: "Réduction de 20% des tickets. Réactivité +30%. Time-to-market 2x plus rapide.",
    client_confidential_name: "Confidentiel — Enterprise SaaS",
    client_confidential_tag: "Service Client & Ingénierie",
    client_confidential_metrics: "-20% tickets,<5 min réponse,2x plus rapide",

    // Approach
    approach_label: "Notre Méthode",
    approach_heading: "Comment nous travaillons",
    approach_subtitle: "Nous ne vendons pas des heures. Nous vendons des résultats. Chaque engagement est cadré, suivi et mesuré contre des métriques business réelles.",
    approach_step1_label: "01",
    approach_step1_title: "Cartographier",
    approach_step1_text: "Nous identifions les tâches qui absorbent du temps et les informations qui disparaissent.",
    approach_step2_label: "02",
    approach_step2_title: "Concevoir",
    approach_step2_text: "Nous choisissons les bons outils pour votre flux de travail. Des agents sur mesure quand rien d'existant ne convient.",
    approach_step3_label: "03",
    approach_step3_title: "Déployer",
    approach_step3_text: "Tout va en production dans votre stack existante. Pas de nouvelles plateformes à apprendre.",
    approach_step4_label: "04",
    approach_step4_title: "Optimiser",
    approach_step4_text: "Nous restons proches, affinons et assurons que votre investissement continue de se multiplier.",

    // Capabilities
    capabilities_label: "Ce Que Nous Construisons",
    capabilities_heading: "Trouvez la friction. Éliminez-la.",
    capabilities_subtitle: "Chaque outil est choisi pour le problème. Rien n'est construit pour le plaisir de construire.",
    cap_1_title: "Audit de Flux",
    cap_1_desc: "Nous cartographions où vos équipes perdent du temps. Les transferts, la répétition, le travail dont plus personne ne parle.",
    cap_2_title: "Stratégie IA & Sélection d'Outils",
    cap_2_desc: "Nous associons les bons outils IA à vos problèmes réels. Quand rien d'existant ne convient, nous construisons des agents sur mesure.",
    cap_3_title: "Implémentation",
    cap_3_desc: "Nous intégrons directement dans votre stack. Vos équipes voient des résultats là où ils travaillent déjà. C'est la norme.",

    // Pricing
    pricing_label: "Tarification",
    pricing_heading: "Un prix, couverture complète",
    pricing_subtitle: "Un studio de déploiement complet pour moins cher qu'un salarié senior. Annulez à tout moment après la phase de déploiement initial — revenez quand vous en avez besoin.",
    pricing_annual_heading: "$8,000 / mois",
    pricing_annual_badge: "Annuel",
    pricing_annual_note: "Engagement minimum de 2 mois. Pause ou annulation à tout moment après.",
    pricing_monthly_heading: "$10,000 / mois",
    pricing_monthly_badge: "Mensuel",
    pricing_monthly_note: "Même couverture. Flexibilité totale. Aucun engagement à long terme.",
    pricing_includes: "Inclus",
    pricing_include_1: "Audit complet des flux de travail",
    pricing_include_2: "Stratégie IA et sélection d'outils",
    pricing_include_3: "Intégration dans vos systèmes",
    pricing_include_4: "Agents sur mesure et automatisations",
    pricing_include_5: "Accès illimité à notre équipe",
    pricing_include_6: "Revue de performance mensuelle",
    pricing_include_7: "Annulation à tout moment après le déploiement initial",
    pricing_cta: "Démarrer",
    pricing_book: "ou réservez un appel de 15 min",
    pricing_caveat: "Besoin d'une solution personnalisée ?",

    // Contact
    contact_label: "Contact",
    contact_heading: "Prêt quand vous l'êtes",
    contact_subtitle: "Pas de vente. Un diagnostic de 30 minutes. Nous vous disons exactement ce qui vaut la peine d'être construit.",
    contact_email_label: "Email",
    contact_phone_label: "Téléphone",
    contact_form_name: "Nom",
    contact_form_email: "Email",
    contact_form_message: "Quel problème essayez-vous de résoudre ?",
    contact_form_submit: "Envoyer",
    contact_form_privacy: "Pas de spam. Nous répondons sous 24 heures.",

    // Footer
    footer_brand: "Une équipe meilleure. Propulsée par l'IA.",
    footer_links: "Entreprise",
    footer_link_home: "Accueil",
    footer_link_work: "Services",
    footer_link_contact: "Contact",
    footer_copyright: "© 2025 Attiteud. Tous droits réservés.",
    footer_privacy: "Politique de Confidentialité",
    footer_terms: "Conditions d'Utilisation",

    // Language toggle
    lang_en: "EN",
    lang_cn: "中",
    lang_fr: "FR",
  },
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    // Check localStorage first
    const saved = localStorage.getItem("attiteud-lang");
    if (saved && ["en", "cn", "fr"].includes(saved)) return saved as Lang;

    // Auto-detect from browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("zh")) return "cn";
    if (browserLang.startsWith("fr")) return "fr";
    return "en";
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("attiteud-lang", newLang);
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[lang][key] || key;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export default LangContext;
