import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowRight, BookOpen, Building2, Globe2, HeartHandshake, Menu, Radio, School, Users, Wifi, X } from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const official = 'https://1liberia.org';
const requestUrl = `${official}/connect-your-community#form`;
const partnerUrl = `${official}/partners#partnership-form`;
const contactUrl = `${official}/contact`;
const photos = {
  mission: `${official}/images/Our%20Mission.jpeg`,
  community: `${official}/images/community.jpg`,
  slide: `${official}/images/slide.jpeg`,
  slide1: `${official}/images/slide1.jpeg`,
  slide2: `${official}/images/slide2.jpeg`,
  vision: `${official}/images/vision.jpg`,
  diaspora: `${official}/images/Built%20by%20the%20Diaspora.jpg`,
  learn: `${official}/images/learn.jpg`,
  about: `${official}/images/aboutus3.jpg`,
  about2: `${official}/images/aboutus2.jpg`,
};

const navItems = [
  ['Home', '/'], ['About Us', '/about'], ['Our Services', '/services'],
  ['Our Cause', '/our-cause'], ['Partners', '/partners'], ['Contact', '/contact'],
];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  return <header className="topbar"><div className="container-wide header-inner">
    <Link href="/" className="brand" aria-label="One Liberia Connect home" data-testid="link-brand">
      <img src={`${official}/images/connect-logo.png`} alt="One Liberia Connect" width="190" height="54" />
    </Link>
    <nav className="nav-links" aria-label="Main navigation">
      {navItems.map(([label, path]) => <Link key={path} href={path} aria-current={location === path ? 'page' : undefined} data-testid={`nav-${path.replace('/', 'home')}`}>{label}</Link>)}
      <Link href="/connect-your-community" className="nav-cta" data-testid="nav-community-cta">Connect Your Community</Link>
    </nav>
    <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X size={23} /> : <Menu size={23} />}</button>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map(([label, path]) => <Link key={path} href={path} aria-current={location === path ? 'page' : undefined}>{label}</Link>)}
      <Link href="/connect-your-community" className="nav-cta">Connect Your Community</Link>
    </nav>}
  </div></header>;
}

function SiteFooter() {
  return <footer className="footer"><div className="container-wide">
    <div className="footer-grid">
      <div><Link href="/" aria-label="One Liberia Connect home"><img className="footer-logo" src={`${official}/images/connect-logo.png`} alt="One Liberia Connect" width="190" height="54" loading="lazy" /></Link><p>In the Community, Built by the Diaspora. Working toward a more connected Liberia through community, schools, and partnership.</p></div>
      <div><h3>Explore</h3><div className="footer-links">{navItems.slice(1,5).map(([label,path])=><Link key={path} href={path}>{label}</Link>)}</div></div>
      <div><h3>Take part</h3><div className="footer-links"><Link href="/connect-your-community">Connect your community</Link><Link href="/partners">Partnership opportunities</Link><a href={contactUrl} target="_blank" rel="noopener noreferrer">Contact One Liberia Connect</a></div></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} One Liberia Connect</span><span>In the Community, Built by the Diaspora.</span></div>
  </div></footer>;
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="site-shell"><SiteHeader />{children}<SiteFooter /></div>;
}

function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | One Liberia Connect`;
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement('meta'); property ? tag.setAttribute('property', name) : tag.setAttribute('name', name); document.head.appendChild(tag); }
      tag.content = content;
    };
    setMeta('description', description);
    setMeta('og:title', `${title} | One Liberia Connect`, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', `${official}/images/connect-logo.png`, true);
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', `${title} | One Liberia Connect`);
    setMeta('twitter:description', description);
  }, [title, description]);
  return null;
}

function Eyebrow({ children }: { children: ReactNode }) { return <span className="eyebrow">{children}</span>; }
function PageHero({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <section className="page-hero"><div className="container-wide animate-in"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p>{children}</p></div></section>;
}
function CTA({ dark = false }: { dark?: boolean }) {
  return <section className="cause-band"><div className="container-wide cause-inner"><div><h2>Let’s connect your community.</h2><p>Tell us where you are and help guide what comes next.</p></div><a className={`button ${dark ? 'button-outline' : 'button-white'}`} href={requestUrl} target="_blank" rel="noopener noreferrer" data-testid="link-community-request">Share your community <ArrowRight size={16}/></a></div></section>;
}

function Home() {
  return <Layout><PageMeta title="Connecting Communities Across Liberia" description="One Liberia Connect is working to bring affordable internet, planned school technology hubs, community champions, and partnership opportunities across Liberia." />
    <main>
      <section className="hero-home"><div className="container-wide hero-grid">
        <div className="animate-in"><Eyebrow>In the Community, Built by the Diaspora.</Eyebrow><h1>Connect your<br/>community.</h1><p>One Liberia Connect is bringing affordable internet to communities across Liberia and planning technology hubs in partner schools. We work with community champions, the diaspora, schools, and investment partners to expand access to learning and opportunity.</p><div className="hero-actions"><Link href="/connect-your-community" className="button button-red">Connect Your Community <ArrowRight size={15}/></Link><Link href="/partners" className="button button-white">Partner With Us</Link></div></div>
        <div className="hero-visual"><img className="hero-photo" src={photos.community} alt="Community members gathering together in Liberia" width="640" height="420"/><div className="hero-note"><small>A shared ambition</small><strong>Connecting <span>250,000</span> Liberians</strong></div></div>
      </div></section>
      <section className="section"><div className="container-wide split">
        <div className="photo-frame"><img className="feature-photo" src={photos.mission} alt="One Liberia Connect team engaging with community members" width="640" height="460" loading="lazy"/></div>
        <div className="copy-block"><Eyebrow>Our mission</Eyebrow><h2>Connection begins with people.</h2><p>Our mission is to bridge the connectivity gap and bring affordable internet to aspirational communities across Liberia. We believe access can open doors to education, communication, and new opportunity.</p><Link href="/about" className="text-link">Learn about One Liberia Connect <ArrowRight size={15}/></Link></div>
      </div></section>
      <section className="section section-soft"><div className="container-wide"><div className="section-head center"><Eyebrow>How we move forward</Eyebrow><h2>Built with communities.<br/>Growing through partnership.</h2><p>A connected future takes local knowledge, trusted relationships, and people willing to build together.</p></div><div className="pillar-grid">
        <article className="pillar"><span className="number">01 / COMMUNITY</span><h3>Affordable internet</h3><p>Working toward reliable, affordable connectivity shaped by community interest and local context.</p></article>
        <article className="pillar"><span className="number">02 / LEARNING</span><h3>Technology hubs in schools</h3><p>Technology hubs are planned with partner schools to support access to digital learning and resources.</p></article>
        <article className="pillar"><span className="number">03 / PARTNERSHIP</span><h3>People who make it possible</h3><p>Community champions, schools, diaspora, and investment partners each have a role to play.</p></article>
      </div></div></section>
      <section className="cause-band"><div className="container-wide cause-inner"><div><h2>Our ambition is big. Our work starts locally.</h2><p>250,000 Liberians connected is an ambition that guides our work—not a claim of current reach.</p></div><div className="impact-number">250,000<small>Liberians — our ambition</small></div></div></section>
      <section className="section"><div className="container-wide split reverse">
        <div className="photo-frame"><img className="feature-photo" src={photos.diaspora} alt="Diaspora-led community connection and collaboration" width="640" height="460" loading="lazy"/></div>
        <div className="copy-block"><Eyebrow>Across generations and borders</Eyebrow><h2>Local roots. A wider circle.</h2><p>Our approach brings community voices together with Liberians in the diaspora, schools, and potential investors. Each conversation helps us understand what connection could mean in that community.</p><Link href="/partners" className="text-link">Explore partnership pathways <ArrowRight size={15}/></Link></div>
      </div></section>
      <section className="section section-navy"><div className="container-wide"><div className="section-head center"><Eyebrow>Community campaign</Eyebrow><h2>Your request helps inform the next step.</h2><p>Communities with the most requests get a feasibility review by December 2026. A request guides review; it does not guarantee coverage or a launch date.</p></div><div style={{textAlign:'center'}}><Link href="/connect-your-community" className="button button-red">How the campaign works <ArrowRight size={15}/></Link></div></div></section>
    </main><CTA/></Layout>;
}

function About() {
  return <Layout><PageMeta title="About One Liberia Connect" description="Learn about One Liberia Connect’s mission to bridge connectivity gaps with communities, schools, diaspora, and partners."/><main>
    <PageHero label="About One Liberia Connect" title="A shared vision for a connected Liberia.">In the Community, Built by the Diaspora. We bring local voices and a wider network together around the possibility of affordable internet and digital access.</PageHero>
    <section className="page-content"><div className="container-wide two-col"><img className="story-image" src={photos.about} alt="Community members participating in a One Liberia Connect activity" width="640" height="480"/><div className="prose"><Eyebrow>Who we are</Eyebrow><h2>Connectivity is more than a signal.</h2><p>One Liberia Connect is working to connect communities across Liberia through affordable internet, planned technology hubs in partner schools, and collaboration with community champions.</p><p>Our work is grounded in the belief that meaningful progress starts with listening. We are building relationships with communities, schools, the Liberian diaspora, and investment partners to explore what is feasible and useful.</p><div className="stat-callout">Our ambition is to connect 250,000 Liberians. This is a future goal, not a measure of current coverage or impact.</div></div></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="section-head"><Eyebrow>What guides us</Eyebrow><h2>From listening to possibility.</h2><p>Our approach keeps community priorities at the center while creating room for practical partnerships.</p></div><div className="pillar-grid"><article className="pillar"><span className="number">01</span><h3>Community first</h3><p>Local requests and conversations help guide feasibility reviews and priorities.</p></article><article className="pillar"><span className="number">02</span><h3>Learning access</h3><p>We are planning school technology hubs with partner schools—not announcing open hubs.</p></article><article className="pillar"><span className="number">03</span><h3>Shared effort</h3><p>Community champions and partners can help turn interest into informed next steps.</p></article></div></div></section>
  </main><CTA/></Layout>;
}

function Services() {
  return <Layout><PageMeta title="Our Services" description="Explore One Liberia Connect’s work toward affordable internet, planned school technology hubs, and community-led connectivity."/><main>
    <PageHero label="Our services" title="Access that can open new doors.">Our work brings together connectivity, learning, and local participation—always shaped by feasibility and community interest.</PageHero>
    <section className="page-content"><div className="container-wide"><div className="section-head"><Eyebrow>What we are working toward</Eyebrow><h2>Three connected parts of the picture.</h2><p>These are areas of focus and planning—not a list of currently available coverage or open facilities.</p></div><div className="service-list">
      <article className="service-card"><div className="icon"><Wifi size={20}/></div><h3>Affordable community internet</h3><p>Working to expand affordable internet access in communities across Liberia, informed by local requests and feasibility review.</p></article>
      <article className="service-card"><div className="icon"><School size={20}/></div><h3>Planned school technology hubs</h3><p>Technology hubs are planned in partner schools to create opportunities for learning and digital access. They are not yet open.</p></article>
      <article className="service-card"><div className="icon"><Users size={20}/></div><h3>Community champions</h3><p>Local champions help connect their communities with information, conversations, and ways to express interest.</p></article>
      <article className="service-card"><div className="icon"><Globe2 size={20}/></div><h3>Diaspora and investment partnerships</h3><p>We welcome conversations with people and organizations interested in supporting a connected future for Liberia.</p></article>
    </div></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="section-head center"><Eyebrow>What happens next</Eyebrow><h2>Interest informs review.</h2><p>A request is a useful signal—but it is not a promise of service or a launch date.</p></div><div className="steps"><article className="step"><b>STEP 01</b><h3>Share interest</h3><p>Tell us about your community through the official request form.</p></article><article className="step"><b>STEP 02</b><h3>Inform feasibility</h3><p>Requests help guide which communities are considered for feasibility review.</p></article><article className="step"><b>STEP 03</b><h3>Explore possibilities</h3><p>Next steps depend on feasibility, partnerships, and community context.</p></article></div></div></section>
  </main><CTA/></Layout>;
}

function OurCause() {
  return <Layout><PageMeta title="Our Cause" description="Learn why One Liberia Connect is working toward affordable internet and digital learning opportunities across Liberia."/><main>
    <PageHero label="Our cause" title="A more connected Liberia is worth building.">Affordable internet and digital access can support learning, communication, and opportunity. We are working toward that future with communities.</PageHero>
    <section className="page-content"><div className="container-wide two-col"><div className="prose"><Eyebrow>The opportunity</Eyebrow><h2>Connection can bring more within reach.</h2><p>Across Liberia, the possibility of being connected matters to families, learners, schools, and communities. One Liberia Connect is working to bridge connectivity gaps by bringing people together around access and practical next steps.</p><p>Our cause is not a claim that coverage already exists everywhere. It is a commitment to listen, explore feasibility, and build relationships that can help make broader access possible.</p></div><img className="story-image" src={photos.vision} alt="A view representing the future vision for connectivity in Liberia" width="640" height="480"/></div></section>
    <section className="cause-band"><div className="container-wide cause-inner"><div><h2>250,000 Liberians connected.</h2><p>A long-term ambition that keeps the work moving forward—never an achieved metric.</p></div><div className="impact-number">A shared goal<small>Not current coverage</small></div></div></section>
    <section className="section"><div className="container-wide two-col"><img className="story-image" src={photos.learn} alt="Learners exploring educational materials together" width="640" height="480" loading="lazy"/><div className="prose"><Eyebrow>Learning and opportunity</Eyebrow><h2>Room to learn, connect, and imagine.</h2><p>Planned technology hubs in partner schools are part of the vision for widening access to digital learning. These hubs are in planning and are not yet open.</p><p>Community requests help us understand where interest exists and guide feasibility reviews. They do not guarantee coverage or a launch date.</p><Link href="/connect-your-community" className="text-link">Read about the community campaign <ArrowRight size={15}/></Link></div></div></section>
  </main><CTA/></Layout>;
}

function Partners() {
  return <Layout><PageMeta title="Partners and Investors" description="Explore how schools, diaspora, community champions, and investment partners can connect with One Liberia Connect."/><main>
    <PageHero label="Partners and investors" title="Build the next connection together.">Progress takes more than infrastructure. It takes people, institutions, and partners willing to listen and work alongside communities.</PageHero>
    <section className="page-content"><div className="container-wide"><div className="section-head"><Eyebrow>Ways to take part</Eyebrow><h2>Different strengths. A shared direction.</h2><p>We welcome conversations from those who want to explore how they might contribute to connectivity and digital access in Liberia.</p></div><div className="partner-panels">
      <article className="partner-panel"><div className="icon"><School size={20}/></div><h2>Schools</h2><p>Explore the possibility of partnering around planned school technology hubs and learning access.</p></article>
      <article className="partner-panel dark-panel"><div className="icon"><Globe2 size={20}/></div><h2>Diaspora</h2><p>Bring relationships, insight, and commitment to a shared effort to connect communities.</p></article>
      <article className="partner-panel dark-panel"><div className="icon"><HeartHandshake size={20}/></div><h2>Community champions</h2><p>Help share information and connect local interest with One Liberia Connect.</p></article>
      <article className="partner-panel"><div className="icon"><Building2 size={20}/></div><h2>Investment partners</h2><p>Discuss potential collaboration and support for a community-grounded approach.</p></article>
    </div><div style={{marginTop:28}}><a href={partnerUrl} className="button button-red" target="_blank" rel="noopener noreferrer" data-testid="link-partnership-form">Start a partnership conversation <ArrowRight size={15}/></a></div></div></section>
    <section className="section section-soft"><div className="container-wide split"><img className="feature-photo" src={photos.slide1} alt="Community partners sharing a moment during a local gathering" width="640" height="460" loading="lazy"/><div className="copy-block"><Eyebrow>Built together</Eyebrow><h2>Partnership starts with a conversation.</h2><p>Tell us what brings you to this work. The official partnership form is the right place to share your interest; it does not imply a commitment or guarantee a project outcome.</p><a href={partnerUrl} className="text-link" target="_blank" rel="noopener noreferrer">Open the official partnership form <ArrowRight size={15}/></a></div></div></section>
  </main><CTA/></Layout>;
}

function Community() {
  const faqs = [
    ['What does submitting a request do?', 'Requests help show where communities are interested and guide feasibility reviews. They do not guarantee coverage, service, or a launch date.'],
    ['When will feasibility reviews happen?', 'The community campaign says communities with the most requests get a feasibility review by December 2026.'],
    ['Does a request mean internet is already available?', 'No. A request is an expression of interest, not confirmation of existing coverage.'],
    ['Are school technology hubs open now?', 'No. Technology hubs in partner schools are planned and are not yet open.'],
  ];
  return <Layout><PageMeta title="Connect Your Community" description="Share your community’s interest in connectivity. Requests guide feasibility reviews; the campaign says communities with the most requests get a review by December 2026."/><main>
    <PageHero label="Connect your community" title="Help your community be heard.">A community request helps us understand where people want affordable internet and informs what may be feasible next.</PageHero>
    <section className="page-content"><div className="container-wide two-col"><div className="prose"><Eyebrow>Community campaign</Eyebrow><h2>Many voices help guide the review.</h2><p>Communities with the most requests get a feasibility review by December 2026. A review is a step toward understanding possibilities—not a promise of coverage, service, or launch timing.</p><p>Share the official request form with people in your community so their interest can be included. The form is hosted on One Liberia Connect’s official website.</p><a href={requestUrl} className="button button-red" target="_blank" rel="noopener noreferrer" data-testid="link-request-form">Go to community request form <ArrowRight size={15}/></a><div className="stat-callout">Requests guide feasibility reviews. Submitting a request does not guarantee coverage or a launch date.</div></div><img className="story-image" src={photos.slide2} alt="People coming together to discuss community connectivity" width="640" height="480"/></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="section-head center"><Eyebrow>Questions, answered</Eyebrow><h2>What to know before you request.</h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    <section className="section"><div className="container-wide split"><img className="feature-photo" src={photos.about2} alt="Local community members taking part in a gathering" width="640" height="460" loading="lazy"/><div className="copy-block"><Eyebrow>Local voices matter</Eyebrow><h2>Share the invitation. Keep expectations clear.</h2><p>Community champions can help people understand what a request does—and what it does not promise. Together, we can make sure local interest is visible as feasibility is considered.</p><Link href="/about" className="text-link">Learn about our approach <ArrowRight size={15}/></Link></div></div></section>
  </main></Layout>;
}

function Contact() {
  return <Layout><PageMeta title="Contact One Liberia Connect" description="Contact One Liberia Connect about community requests, partnership opportunities, and the work to connect communities across Liberia."/><main>
    <PageHero label="Contact" title="Start with a conversation.">Have a question or want to explore how you can take part? Choose the path that best fits your interest.</PageHero>
    <section className="page-content"><div className="container-wide"><div className="section-head"><Eyebrow>Reach out</Eyebrow><h2>We’d like to hear from you.</h2><p>To ensure your inquiry reaches the right team, use the official One Liberia Connect contact page or the relevant request form.</p></div><div className="contact-choices">
      <a className="contact-choice" href={contactUrl} target="_blank" rel="noopener noreferrer" data-testid="link-contact-inquiry"><Radio size={21} color="#b20f3a"/><h3>General inquiries</h3><p>Questions about One Liberia Connect and our work.</p></a>
      <a className="contact-choice" href={requestUrl} target="_blank" rel="noopener noreferrer" data-testid="link-contact-community"><Users size={21} color="#b20f3a"/><h3>Community requests</h3><p>Share interest on behalf of your community.</p></a>
      <a className="contact-choice" href={partnerUrl} target="_blank" rel="noopener noreferrer" data-testid="link-contact-partnership"><BookOpen size={21} color="#b20f3a"/><h3>Partnership inquiries</h3><p>Explore school, diaspora, or investment partnership.</p></a>
    </div></div></section>
  </main></Layout>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/our-cause" component={OurCause} />
        <Route path="/partners" component={Partners} />
        <Route path="/connect-your-community" component={Community} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
