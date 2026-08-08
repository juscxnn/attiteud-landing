import { createContext, useContext, useState, useCallback, useEffect } from "react";

type Lang = "en" | "cn" | "fr";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    nav_home: "Home",
    nav_work: "Work",
    nav_contact: "Contact",
    nav_cta: "Book a Call",

    hero_label: "0-to-1 Launch Studio",
    hero_tagline: "Launch Studio",
    hero_line1: "Launch your startup.",
    hero_line2: "We build. You grow.",
    hero_desc: "Seasoned builders who ship. We use AI to accelerate development. Design by Humbl Design. One team, one price.",
    hero_subtitle: "Your idea, shipped. We build MVPs. Humbl Design makes them beautiful. One team, one price.",
    hero_cta: "Start building",
    hero_explore: "See our work",

    usecases_label: "Who We Help",
    usecases_heading: "Built for founders, not enterprises",
    usecases_subtitle: "Non-technical founders, solo builders, and early teams who need to ship fast and look sharp.",
    "uc_bd_pain": "You have a validated idea but no technical cofounder. We become your build team. Scope, architect, ship a working MVP.",
    "uc_sales_pain": "You have early traction. We handle the tech while you handle customers. Features ship weekly, not quarterly.",
    "uc_cs_pain": "Your product is live but rough. We refactor, redesign, and polish. Retention ready without slowing you down.",
    "uc_ops_pain": "Drowning in manual workflows. We automate onboarding, billing, and everything in between.",
    "uc_marketing_pain": "You need a landing page, waitlist, and launch presence. Attiteud builds the product. Humbl Design makes it look like a Series A company.",
    "uc_product_pain": "Your team is stretched thin. We embed as engineers and ship faster. No hiring pipeline needed.",
    "uc_bd_tag": "Idea to MVP",
    "uc_bd_name": "Non-technical founders",
    "uc_sales_tag": "Speed & scale",
    "uc_sales_name": "Early-stage teams",
    "uc_cs_tag": "Polish & retain",
    "uc_cs_name": "Live products",
    "uc_ops_tag": "Automation",
    "uc_ops_name": "Operations",
    "uc_marketing_tag": "Launch presence",
    "uc_marketing_name": "Brand & GTM",
    "uc_product_tag": "Embedded engineers",
    "uc_product_name": "Stretched teams",

    research_stats_label: "The Numbers",
    research_stats_heading: "Why speed + design wins",
    stat_1_label: "Of startups fail before finding product market fit",
    stat_2_label: "Fail because nobody wanted what they built",
    stat_3_label: "ROI premium for design led companies",
    stat_4_label: "Typical solo founder MVP timeline",
    stat_5_label: "MVP timeline with the right build team",
    stat_6_label: "What agencies quote for an MVP. Before change orders.",

    research_label: "Discovery & Scoping",
    research_heading: "Before we write a line of code",
    research_subtitle: "We start with your vision. We scope the MVP, strip everything non-essential, and define exactly what ships.",
    research_step1_label: "Scope",
    research_step1_title: "We define the MVP",
    research_step1_text: "1-hour deep dive. We map your idea, identify the core value prop, and strip every feature that does not validate your thesis.",
    research_step2_label: "Spec",
    research_step2_title: "We write the blueprint",
    research_step2_text: "Architecture, stack, API design, data models. A clear spec any engineer can follow. No lock in. No black boxes.",
    research_step3_label: "Prioritise",
    research_step3_title: "We sequence the build",
    research_step3_text: "Phase 1 gets you to launch. Phase 2 is growth. Phase 3 is scale. You always know what ships when and why.",

    clients_label: "Built by Us",
    clients_heading: "Founded by a builder",
    clients_narrative: "Attiteud was founded by someone who has built, launched, and sold multiple startups. Dozens of side projects. Some with AI. Some vibe coded. All shipped. Here are a few.",
    client_nichesim_name: "nichesim.com",
    client_nichesim_tag: "Live",
    client_nichesim_oneliner: "BD automation platform across 14 regions. Full end to end sales pipeline.",
    client_copyscouts_name: "copyscouts.com",
    client_copyscouts_tag: "Acquired",
    client_copyscouts_oneliner: "AI copywriting tool. Grew to paying customers, then sold.",
    client_podletter_name: "podletter.io",
    client_podletter_tag: "Acquired",
    client_podletter_oneliner: "Newsletter growth platform. Built, scaled, and exited.",
    client_gatekeep_name: "gatekeep.vc",
    client_gatekeep_tag: "Live",
    client_gatekeep_oneliner: "Fundraising tech. Founders pitch AI simulated VCs calibrated by real investors.",

    partnership_label: "Partnership",
    partnership_heading: "Attiteud x Humbl Design",
    partnership_subtitle: "We build the product. Humbl Design makes it beautiful. One team, one price.",
    partnership_body: "Humbl Design has shipped landing pages, product designs, and brand identities for 50+ founders across fintech, AI, and robotics. Clients they have worked with have raised over $20M. First visuals land in 72 hours. Unlimited revisions. No templates. Every project is built from scratch in Figma.",
    partnership_stat_1: "72 hours to first visuals",
    partnership_stat_2: "50+ founders served",
    partnership_stat_3: "$20M+ raised by clients",
    partnership_stat_4: "Unlimited revisions",
    partnership_btn: "Visit Humbl Design",

    approach_label: "How We Work",
    approach_heading: "Scope. Build. Launch. Grow.",
    approach_subtitle: "No retainer theatre. No hourly billing. Just weekly ships and a live product at the end.",
    approach_step1_label: "01",
    approach_step1_title: "Scope",
    approach_step1_text: "We define the MVP together. Strip to essentials. Write the spec. No scope creep.",
    approach_step2_label: "02",
    approach_step2_title: "Build",
    approach_step2_text: "We ship working software on a weekly cadence. You see progress in days, not months.",
    approach_step3_label: "03",
    approach_step3_title: "Launch",
    approach_step3_text: "Deploy, test, iterate. Humbl Design delivers a launch-ready brand and landing page. You go live looking like a Series A company.",
    approach_step4_label: "04",
    approach_step4_title: "Grow",
    approach_step4_text: "Scale what works. Kill what does not. We stay close and ship features that move the needle.",

    capabilities_label: "What We Do",
    capabilities_heading: "Build. Design. Launch.",
    capabilities_subtitle: "Seasoned builders. World class designers. One team. One price.",
    cap_1_title: "Ship your MVP",
    cap_1_desc: "We are builders first. Full stack engineers who use AI to ship faster. React, Node, Python. Vibe coded or production grade. Whatever gets you to launch in weeks.",
    cap_2_title: "Look like a Series A",
    cap_2_desc: "Humbl Design handles everything visual. Brand identity. Conversion optimized landing page. Product design. First visuals in 72 hours. Unlimited revisions. No templates. Trusted by 50+ founders.",
    cap_3_title: "Automate the rest",
    cap_3_desc: "Custom AI agents for the parts that need intelligence. Automated workflows. Payments. Analytics. Email. Everything between code and customers. Ship it and forget it.",

    pricing_label: "Pricing",
    pricing_heading: "One team. One price.",
    pricing_subtitle: "Seasoned builders and world class designers. One monthly subscription. Cancel anytime after the initial build.",
    pricing_annual_heading: "$10,000 / month",
    pricing_annual_badge: "Monthly",
    pricing_annual_note: "Minimum 2-month commitment. Pause or cancel anytime after.",
    pricing_monthly_heading: "$10,000 / month",
    pricing_monthly_badge: "Monthly",
    pricing_monthly_note: "Same coverage. Full flexibility. No long-term lock-in.",
    pricing_includes: "Includes",
    pricing_include_1: "Full MVP scoping & architecture",
    pricing_include_2: "Weekly development sprints",
    pricing_include_3: "AI & automation integration",
    pricing_include_4: "Humbl Design: brand and landing page",
    pricing_include_5: "Unlimited access to the build team",
    pricing_include_6: "Weekly progress reviews",
    pricing_include_7: "Cancel anytime after initial build",
    pricing_cta: "Start building",
    pricing_book: "or book a 15-min call",
    pricing_caveat: "Need something custom?",

    contact_label: "Contact",
    contact_heading: "Ready when you are",
    contact_subtitle: "No sales pitch. A 30 minute call. You tell us your idea. We tell you what it takes to launch it.",
    contact_email_label: "Email",
    contact_phone_label: "Phone",
    contact_form_name: "Name",
    contact_form_email: "Email",
    contact_form_message: "What are you building?",
    contact_form_submit: "Send message",
    contact_form_privacy: "No spam. We reply within 24 hours.",

    footer_brand: "A better way to launch.",
    footer_links: "Company",
    footer_link_home: "Home",
    footer_link_work: "Work",
    footer_link_contact: "Contact",
    footer_copyright: "© 2025 Attiteud. All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",

    lang_en: "EN",
    lang_cn: "中",
    lang_fr: "FR",
  },
  cn: {
    nav_home: "首页",
    nav_work: "作品",
    nav_contact: "联系",
    nav_cta: "预约通话",

    hero_label: "0到1启动工作室",
    hero_tagline: "启动工作室",
    hero_line1: "启动你的创业项目。",
    hero_line2: "我们构建。你来成长。",
    hero_desc: "从一张草图到产品上线。我们在数周内交付可用的 MVP，接入 AI 智能体，让你快速进入市场——不是几个月，是几周。",
    hero_subtitle: "构建、设计、上线。技术执行由 Attiteud 负责。世界级设计由 Humbl Design 负责。一个团队，一个价格。",
    hero_cta: "开始构建",
    hero_explore: "查看我们的作品",

    usecases_label: "我们帮助谁",
    usecases_heading: "为创始人生，非为企业造",
    usecases_subtitle: "非技术背景创始人、独立开发者、早期团队——需要快速交付并看起来专业的你。",
    "uc_bd_pain": "你有经过验证的创意但没有技术联合创始人。我们成为你的构建团队——定义范围、设计架构、交付可用的 MVP。",
    "uc_sales_pain": "你已有早期增长。我们负责技术，你专注客户。功能按周迭代交付，不是按季度。",
    "uc_cs_pain": "产品已上线但边缘粗糙。我们重构、重设计、打磨——让产品具备留客能力，不拖慢你的速度。",
    "uc_ops_pain": "你被手动流程淹没。我们自动化从入驻到计费的一切，让你专注核心事务。",
    "uc_marketing_pain": "你需要落地页、候补名单和上线形象。Attiteud 构建产品。Humbl Design 让它看起来像 A 轮公司。",
    "uc_product_pain": "你已有团队但人手紧张。我们以前沿部署工程师身份嵌入，无需招聘即可加快交付。",
    "uc_bd_tag": "从创意到MVP",
    "uc_bd_name": "非技术背景创始人",
    "uc_sales_tag": "速度与规模",
    "uc_sales_name": "早期团队",
    "uc_cs_tag": "打磨与留存",
    "uc_cs_name": "已上线产品",
    "uc_ops_tag": "自动化",
    "uc_ops_name": "运营",
    "uc_marketing_tag": "上线形象",
    "uc_marketing_name": "品牌与市场",
    "uc_product_tag": "嵌入式工程",
    "uc_product_name": "人手紧张的团队",

    research_stats_label: "数据",
    research_stats_heading: "为什么速度+设计能赢",
    stat_1_label: "的初创企业未找到产品市场匹配就失败",
    stat_2_label: "失败因为没有市场需求",
    stat_3_label: "设计主导企业的ROI超额收益",
    stat_4_label: "独立创始人典型MVP构建时间",
    stat_5_label: "有合适团队时的MVP交付时间",
    stat_6_label: "代理商MVP报价——不含变更",

    research_label: "发现与范围定义",
    research_heading: "在写第一行代码之前",
    research_subtitle: "我们从你的愿景出发。定义 MVP 范围，剔除一切非必要的，明确要交付什么。",
    research_step1_label: "范围",
    research_step1_title: "定义 MVP",
    research_step1_text: "1 小时深入讨论。我们梳理你的创意，识别核心价值主张，剔除所有无法验证假设的功能。",
    research_step2_label: "规格",
    research_step2_title: "编写蓝图",
    research_step2_text: "架构、技术栈、API 设计、数据模型。你得到一份清晰的规格说明，任何工程师都能执行——不锁定供应商，无黑盒。",
    research_step3_label: "优先级",
    research_step3_title: "排定构建顺序",
    research_step3_text: "阶段一推向市场。阶段二是增长。阶段三是规模化。你始终清楚什么何时交付以及为什么。",

    clients_label: "我们构建的",
    clients_heading: "由建设者创立",
    clients_narrative: "Attiteud 由一位构建、上线并出售过多家初创公司的建设者创立。数十个业余项目。有的用 AI。有的 vibe coded。全都交付了。以下是其中几个。",
    client_nichesim_name: "nichesim.com",
    client_nichesim_tag: "已上线",
    client_nichesim_oneliner: "跨 14 个地区的商务拓展自动化平台。端到端销售管道。",
    client_copyscouts_name: "copyscouts.com",
    client_copyscouts_tag: "已退出",
    client_copyscouts_oneliner: "AI 文案工具。增长至付费用户后出售。",
    client_podletter_name: "podletter.io",
    client_podletter_tag: "已退出",
    client_podletter_oneliner: "Newsletter 增长平台。构建、规模化并退出。",
    client_gatekeep_name: "gatekeep.vc",
    client_gatekeep_tag: "已上线",
    client_gatekeep_oneliner: "融资科技。创始人向由真实投资人校准的 AI 模拟 VC 路演。",

    partnership_label: "合作伙伴",
    partnership_heading: "Attiteud x Humbl Design",
    partnership_subtitle: "技术执行邂逅世界级设计。我们构建产品。他们让它惊艳。一个团队，一个价格。",
    partnership_body: "Humbl Design 为 50+ 位金融科技、AI 和机器人领域的创始人交付了落地页、产品设计和品牌形象。其客户累计融资超 $20M。首批设计方案 72 小时内交付。无限次修改。无模板——每个项目从 Figma 白板开始。",
    partnership_stat_1: "72 小时交付首批设计",
    partnership_stat_2: "服务 50+ 创始人",
    partnership_stat_3: "客户累计融资超 $20M",
    partnership_stat_4: "无限次修改",
    partnership_btn: "了解 Humbl Design",

    approach_label: "我们的方式",
    approach_heading: "定义。构建。上线。增长。",
    approach_subtitle: "没有月费套路。没有按小时计费。只有每周交付和最终上线的产品。",
    approach_step1_label: "01",
    approach_step1_title: "定义",
    approach_step1_text: "我们共同定义 MVP。精简到核心。编写规格。不扩大范围。",
    approach_step2_label: "02",
    approach_step2_title: "构建",
    approach_step2_text: "我们按周交付可用软件。你以天为单位看到进展，不是月。",
    approach_step3_label: "03",
    approach_step3_title: "上线",
    approach_step3_text: "部署、测试、迭代。Humbl Design 交付上线就绪的品牌和落地页。你以 A 轮公司的形象亮相。",
    approach_step4_label: "04",
    approach_step4_title: "增长",
    approach_step4_text: "放大有效的，停掉无效的。我们保持紧密合作，交付能推动关键指标的功具。",

    capabilities_label: "我们做什么",
    capabilities_heading: "构建。设计。上线。",
    capabilities_subtitle: "资深构建者。世界级设计师。一个团队，一个价格。",
    cap_1_title: "交付你的 MVP",
    cap_1_desc: "我们首先是构建者。使用 AI 加速交付的全栈工程师。React、Node、Python。Vibe coded 或生产级别。在数周内让你上线。",
    cap_2_title: "看起来像 A 轮",
    cap_2_desc: "Humbl Design 负责所有视觉。品牌形象。高转化落地页。产品设计。72 小时出首批方案。无限修改。不用模板。已服务 50+ 位创始人。",
    cap_3_title: "自动化其他一切",
    cap_3_desc: "为需要智能的部分定制 AI 智能体。自动化工作流。支付。分析。邮件。代码与客户之间的一切。交付即遗忘。",

    pricing_label: "定价",
    pricing_heading: "一个团队。一个价格。",
    pricing_subtitle: "Attiteud 构建 + Humbl Design。技术执行和世界级设计合为一个月度订阅。初始构建阶段后可随时取消。",
    pricing_annual_heading: "$10,000 / 月",
    pricing_annual_badge: "月付",
    pricing_annual_note: "至少承诺 2 个月。之后可暂停或取消。",
    pricing_monthly_heading: "$10,000 / 月",
    pricing_monthly_badge: "月付",
    pricing_monthly_note: "同等覆盖。完全灵活。无长期绑定。",
    pricing_includes: "包含",
    pricing_include_1: "完整 MVP 范围定义与架构",
    pricing_include_2: "每周开发迭代",
    pricing_include_3: "AI 与自动化集成",
    pricing_include_4: "Humbl Design: 品牌与落地页",
    pricing_include_5: "无限访问构建团队",
    pricing_include_6: "每周进展回顾",
    pricing_include_7: "初始构建后随时取消",
    pricing_cta: "开始构建",
    pricing_book: "或预约 15 分钟通话",
    pricing_caveat: "需要定制方案？",

    contact_label: "联系",
    contact_heading: "随时恭候",
    contact_subtitle: "没有推销。一个 30 分钟的通话。我们准确告诉你上线你的想法需要什么。",
    contact_email_label: "邮箱",
    contact_phone_label: "电话",
    contact_form_name: "姓名",
    contact_form_email: "邮箱",
    contact_form_message: "你正在构建什么？",
    contact_form_submit: "发送消息",
    contact_form_privacy: "不发垃圾邮件。我们 24 小时内回复。",

    footer_brand: "更好的上线方式。",
    footer_links: "公司",
    footer_link_home: "首页",
    footer_link_work: "作品",
    footer_link_contact: "联系",
    footer_copyright: "© 2025 Attiteud. 保留所有权利。",
    footer_privacy: "隐私政策",
    footer_terms: "服务条款",

    lang_en: "EN",
    lang_cn: "中",
    lang_fr: "FR",
  },
  fr: {
    nav_home: "Accueil",
    nav_work: "Projets",
    nav_contact: "Contact",
    nav_cta: "Réserver un Appel",

    hero_label: "Studio de Lancement 0-to-1",
    hero_tagline: "Studio de Lancement",
    hero_line1: "Lancez votre startup.",
    hero_line2: "Nous construisons. Vous grandissez.",
    hero_desc: "De l'esquisse au produit en ligne. Nous livrons des MVP fonctionnels en quelques semaines, intégrons l'IA là où elle compte, et vous mettons sur le marché en semaines  -  pas en mois.",
    hero_subtitle: "Construisez, designez, lancez. Exécution technique par Attiteud. Design de classe mondiale par Humbl Design. Une équipe, un prix.",
    hero_cta: "Commencez à construire",
    hero_explore: "Voir nos projets",

    usecases_label: "Qui Nous Aidons",
    usecases_heading: "Conçu pour les fondateurs, pas les entreprises",
    usecases_subtitle: "Fondateurs non-techniques, solo builders, et équipes early-stage qui doivent livrer vite et avoir l'air pro.",
    "uc_bd_pain": "Vous avez une idée validée mais pas de co-fondateur technique. Nous devenons votre équipe de build  -  cadrage, architecture, et livraison d'un MVP qui fonctionne vraiment.",
    "uc_sales_pain": "Vous avez une traction précoce. Nous gérons la tech pendant que vous gérez les clients. Les fonctionnalités sont livrées chaque semaine, pas chaque trimestre.",
    "uc_cs_pain": "Votre produit est en ligne mais brut. Nous refactorisons, redesignons et polissons  -  le rendant prêt pour la rétention sans vous ralentir.",
    "uc_ops_pain": "Vous êtes noyé sous les workflows manuels. Nous automatisont tout, de l'onboarding à la facturation, pour que vous puissiez vous concentrer sur l'essentiel.",
    "uc_marketing_pain": "Vous avez besoin d'une landing page, d'une liste d'attente et d'une présence de lancement. Attiteud construit le produit. Humbl Design le fait ressembler à une Série A.",
    "uc_product_pain": "Vous avez une équipe mais elle est à bout de souffle. Nous nous intégrons comme ingénieurs déployés pour livrer plus vite sans embaucher.",
    "uc_bd_tag": "Idée au MVP",
    "uc_bd_name": "Fondateurs non-techniques",
    "uc_sales_tag": "Vitesse & échelle",
    "uc_sales_name": "Équipes early-stage",
    "uc_cs_tag": "Polissage & rétention",
    "uc_cs_name": "Produits en ligne",
    "uc_ops_tag": "Automatisation",
    "uc_ops_name": "Opérations",
    "uc_marketing_tag": "Présence de lancement",
    "uc_marketing_name": "Marque & GTM",
    "uc_product_tag": "Ingénieurs intégrés",
    "uc_product_name": "Équipes sous tension",

    research_stats_label: "Les Chiffres",
    research_stats_heading: "Pourquoi vitesse + design gagnent",
    stat_1_label: "Des startups échouent avant le product-market fit",
    stat_2_label: "Échouent parce que personne ne voulait ce qu'elles ont construit",
    stat_3_label: "Prime de ROI pour les entreprises axées design",
    stat_4_label: "Délai typique d'un MVP pour un fondateur solo",
    stat_5_label: "Délai MVP avec la bonne équipe de build",
    stat_6_label: "Ce que les agences facturent pour un MVP  -  hors avenants",

    research_label: "Découverte & Cadrage",
    research_heading: "Avant d'écrire une ligne de code",
    research_subtitle: "Nous partons de votre vision. Nous cadrons le MVP, éliminons tout le superflu, et définissons exactement ce qui sera livré.",
    research_step1_label: "Cadrer",
    research_step1_title: "Nous définissons le MVP",
    research_step1_text: "Session approfondie d'1 heure. Nous cartographions votre idée, identifions la proposition de valeur centrale, et supprimons toute fonctionnalité qui ne valide pas votre thèse.",
    research_step2_label: "Spécifier",
    research_step2_title: "Nous écrivons le plan",
    research_step2_text: "Architecture, choix de stack, design API, modèles de données. Vous obtenez une spec claire que tout ingénieur peut suivre  -  sans verrouillage, sans boîte noire.",
    research_step3_label: "Prioriser",
    research_step3_title: "Nous séquençons le build",
    research_step3_text: "Phase 1 vous met en ligne. Phase 2 c'est la croissance. Phase 3 c'est l'échelle. Vous savez toujours ce qui est livré, quand et pourquoi.",

    clients_label: "Construit par Nous",
    clients_heading: "Fondé par un builder",
    clients_narrative: "Attiteud a été fondé par quelqu'un qui a construit, lancé et vendu plusieurs startups. Des dizaines de side projects. Certains avec l'IA. Certains vibe coded. Tous livrés. En voici quelques uns.",
    client_nichesim_name: "nichesim.com",
    client_nichesim_tag: "En ligne",
    client_nichesim_oneliner: "Plateforme d'automatisation BD dans 14 régions. Pipeline de vente complet.",
    client_copyscouts_name: "copyscouts.com",
    client_copyscouts_tag: "Acquis",
    client_copyscouts_oneliner: "Outil de copywriting IA. Développé jusqu'aux clients payants, puis vendu.",
    client_podletter_name: "podletter.io",
    client_podletter_tag: "Acquis",
    client_podletter_oneliner: "Plateforme de croissance de newsletters. Construite, mise à l'échelle, et revendue.",
    client_gatekeep_name: "gatekeep.vc",
    client_gatekeep_tag: "En ligne",
    client_gatekeep_oneliner: "Fundraising tech. Les fondateurs pitchent devant des VCs simulés par IA, calibrés par de vrais investisseurs.",

    partnership_label: "Partenariat",
    partnership_heading: "Attiteud x Humbl Design",
    partnership_subtitle: "L'exécution technique rencontre le design de classe mondiale. Nous construisons le produit. Ils le rendent magnifique. Une équipe, un prix.",
    partnership_body: "Humbl Design a livré des landing pages, des designs produit et des identités de marque pour plus de 50 fondateurs dans la fintech, l'IA et la robotique. Leurs clients ont levé plus de $20M. Premières maquettes en 72 heures. Révisions illimitées. Pas de templates  -  chaque projet est conçu from scratch dans Figma.",
    partnership_stat_1: "72h pour les premières maquettes",
    partnership_stat_2: "50+ fondateurs servis",
    partnership_stat_3: "$20M+ levés par les clients",
    partnership_stat_4: "Révisions illimitées",
    partnership_btn: "Visiter Humbl Design",

    approach_label: "Notre Méthode",
    approach_heading: "Cadrer. Construire. Lancer. Grandir.",
    approach_subtitle: "Pas de théâtre de retainer. Pas de facturation horaire. Juste des livraisons hebdomadaires et un produit en ligne à la fin.",
    approach_step1_label: "01",
    approach_step1_title: "Cadrer",
    approach_step1_text: "Nous définissons le MVP ensemble. Réduisons à l'essentiel. Écrivons la spec. Pas de dérive de scope.",
    approach_step2_label: "02",
    approach_step2_title: "Construire",
    approach_step2_text: "Nous livrons du logiciel fonctionnel chaque semaine. Vous voyez les progrès en jours, pas en mois.",
    approach_step3_label: "03",
    approach_step3_title: "Lancer",
    approach_step3_text: "Déployer, tester, itérer. Humbl Design livre une marque et une landing page prêtes pour le lancement. Vous êtes en ligne avec l'allure d'une Série A.",
    approach_step4_label: "04",
    approach_step4_title: "Grandir",
    approach_step4_text: "Amplifiez ce qui marche. Arrêtez ce qui ne marche pas. Nous restons proches et livrons les fonctionnalités qui font bouger les indicateurs.",

    capabilities_label: "Ce Que Nous Faisons",
    capabilities_heading: "Construire. Designer. Lancer.",
    capabilities_subtitle: "Des builders expérimentés. Des designers de classe mondiale. Une équipe. Un prix.",
    cap_1_title: "Livrez votre MVP",
    cap_1_desc: "Nous sommes des builders avant tout. Ingénieurs full stack qui utilisent l'IA pour livrer plus vite. React, Node, Python. Vibe coded ou production grade. En ligne en quelques semaines.",
    cap_2_title: "Rayonnez comme une Série A",
    cap_2_desc: "Humbl Design s'occupe de tout le visuel. Identité de marque. Landing page optimisée pour la conversion. Design produit. Premières maquettes en 72h. Révisions illimitées. Aucun template. Plus de 50 fondateurs servis.",
    cap_3_title: "Automatisez le reste",
    cap_3_desc: "Agents IA sur mesure pour ce qui a besoin d'intelligence. Workflows automatisés. Paiements. Analytique. Email. Tout entre le code et les clients. Lancez et oubliez.",

    pricing_label: "Tarification",
    pricing_heading: "Une équipe. Un prix.",
    pricing_subtitle: "Build Attiteud + Humbl Design. Exécution technique et design de classe mondiale en un seul abonnement mensuel. Annulez à tout moment après la phase de build initiale.",
    pricing_annual_heading: "$10,000 / mois",
    pricing_annual_badge: "Mensuel",
    pricing_annual_note: "Engagement minimum de 2 mois. Pause ou annulation à tout moment après.",
    pricing_monthly_heading: "$10,000 / mois",
    pricing_monthly_badge: "Mensuel",
    pricing_monthly_note: "Même couverture. Flexibilité totale. Aucun engagement à long terme.",
    pricing_includes: "Inclus",
    pricing_include_1: "Cadrage MVP complet & architecture",
    pricing_include_2: "Sprints de développement hebdomadaires",
    pricing_include_3: "Intégration IA & automatisation",
    pricing_include_4: "Humbl Design: marque et landing page",
    pricing_include_5: "Accès illimité à l'équipe de build",
    pricing_include_6: "Revues de progression hebdomadaires",
    pricing_include_7: "Annulation à tout moment après le build initial",
    pricing_cta: "Commencez à construire",
    pricing_book: "ou réservez un appel de 15 min",
    pricing_caveat: "Besoin d'une solution personnalisée ?",

    contact_label: "Contact",
    contact_heading: "Prêt quand vous l'êtes",
    contact_subtitle: "Pas de vente. Un appel de 30 minutes. Nous vous disons exactement ce qu'il faudra pour lancer votre idée.",
    contact_email_label: "Email",
    contact_phone_label: "Téléphone",
    contact_form_name: "Nom",
    contact_form_email: "Email",
    contact_form_message: "Que construisez-vous ?",
    contact_form_submit: "Envoyer",
    contact_form_privacy: "Pas de spam. Nous répondons sous 24 heures.",

    footer_brand: "Une meilleure façon de lancer.",
    footer_links: "Entreprise",
    footer_link_home: "Accueil",
    footer_link_work: "Projets",
    footer_link_contact: "Contact",
    footer_copyright: "© 2025 Attiteud. Tous droits réservés.",
    footer_privacy: "Politique de Confidentialité",
    footer_terms: "Conditions d'Utilisation",

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

function detectBrowserLang(): Lang {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("zh")) return "cn";
  if (browserLang.startsWith("fr")) return "fr";
  return "en";
}

const LANG_FROM_PATH: Record<string, Lang> = {
  en: "en",
  cn: "cn",
  fr: "fr",
};

function getLangFromPath(): Lang | null {
  const segments = window.location.pathname.split("/").filter(Boolean);
  if (segments.length > 0 && LANG_FROM_PATH[segments[0]]) {
    return LANG_FROM_PATH[segments[0]];
  }
  return null;
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const fromPath = getLangFromPath();
    if (fromPath) return fromPath;

    const saved = localStorage.getItem("attiteud-lang");
    if (saved && ["en", "cn", "fr"].includes(saved)) return saved as Lang;

    return detectBrowserLang();
  });

  useEffect(() => {
    const fromPath = getLangFromPath();
    if (fromPath && fromPath !== lang) {
      setLangState(fromPath);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("attiteud-lang", newLang);

    // Update URL path without full page reload
    const segments = window.location.pathname.split("/").filter(Boolean);
    const rest = segments.length > 1 && LANG_FROM_PATH[segments[0]]
      ? "/" + segments.slice(1).join("/")
      : "/" + segments.join("/");

    const newPath = rest === "/" ? `/${newLang}` : `/${newLang}${rest}`;
    window.history.replaceState(null, "", newPath);
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
