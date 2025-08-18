// RSS Feed Manager for Diabetes Information Discovery
// Manages comprehensive Reddit RSS feeds and other public RSS sources

export interface RSSFeed {
  name: string;
  rss: string;
  json: string;
  category: 'diabetes' | 'medical' | 'research' | 'lifestyle' | 'technology' | 'regional' | 'general';
  priority: 'high' | 'medium' | 'low';
  lastFetched?: Date;
  status: 'active' | 'inactive' | 'error';
}

export interface RSSFeedContent {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  source: string;
  category: string;
  url: string;
  engagement?: {
    upvotes: number;
    comments: number;
    score: number;
  };
  keywords: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

export class RSSFeedManager {
  private feeds: RSSFeed[] = [];
  private contentCache: Map<string, RSSFeedContent[]> = new Map();
  private fetchQueue: string[] = [];
  private isProcessing = false;

  constructor() {
    this.initializeFeeds();
  }

  private initializeFeeds(): void {
    // ===== HIGH PRIORITY - CORE DIABETES COMMUNITIES =====
    this.feeds.push(
      { name: 'r/Type1Diabetes', rss: 'https://www.reddit.com/r/Type1Diabetes/.rss', json: 'https://www.reddit.com/r/Type1Diabetes.json', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'r/diabetes', rss: 'https://www.reddit.com/r/diabetes/.rss', json: 'https://www.reddit.com/r/diabetes.json', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'r/diabetes_t1', rss: 'https://www.reddit.com/r/diabetes_t1/.rss', json: 'https://www.reddit.com/r/diabetes_t1.json', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'r/diabetes_t2', rss: 'https://www.reddit.com/r/diabetes_t2/.rss', json: 'https://www.reddit.com/r/diabetes_t2.json', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'r/diabetes_t1_tech', rss: 'https://www.reddit.com/r/diabetes_t1_tech/.rss', json: 'https://www.reddit.com/r/diabetes_t1_tech.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/diabetes_t2_tech', rss: 'https://www.reddit.com/r/diabetes_t2_tech/.rss', json: 'https://www.reddit.com/r/diabetes_t2_tech.json', category: 'technology', priority: 'high', status: 'active' }
    );

    // ===== HIGH PRIORITY - DEVICE COMMUNITIES =====
    this.feeds.push(
      { name: 'r/dexcom', rss: 'https://www.reddit.com/r/dexcom/.rss', json: 'https://www.reddit.com/r/dexcom.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/Freestylelibre', rss: 'https://www.reddit.com/r/Freestylelibre/.rss', json: 'https://www.reddit.com/r/Freestylelibre.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/Omnipod', rss: 'https://www.reddit.com/r/Omnipod/.rss', json: 'https://www.reddit.com/r/Omnipod.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/insulinpumps', rss: 'https://www.reddit.com/r/insulinpumps/.rss', json: 'https://www.reddit.com/r/insulinpumps.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/CGM', rss: 'https://www.reddit.com/r/CGM/.rss', json: 'https://www.reddit.com/r/CGM.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/Looped', rss: 'https://www.reddit.com/r/Looped/.rss', json: 'https://www.reddit.com/r/Looped.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/OpenAPS', rss: 'https://www.reddit.com/r/OpenAPS/.rss', json: 'https://www.reddit.com/r/OpenAPS.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/Nightscout', rss: 'https://www.reddit.com/r/Nightscout/.rss', json: 'https://www.reddit.com/r/Nightscout.json', category: 'technology', priority: 'high', status: 'active' }
    );

    // ===== HIGH PRIORITY - LIFESTYLE & DIET =====
    this.feeds.push(
      { name: 'r/LowCarbDiabetic', rss: 'https://www.reddit.com/r/LowCarbDiabetic/.rss', json: 'https://www.reddit.com/r/LowCarbDiabetic.json', category: 'lifestyle', priority: 'high', status: 'active' },
      { name: 'r/KetoDiabetes', rss: 'https://www.reddit.com/r/KetoDiabetes/.rss', json: 'https://www.reddit.com/r/KetoDiabetes.json', category: 'lifestyle', priority: 'high', status: 'active' },
      { name: 'r/PlantBasedDiabetes', rss: 'https://www.reddit.com/r/PlantBasedDiabetes/.rss', json: 'https://www.reddit.com/r/PlantBasedDiabetes.json', category: 'lifestyle', priority: 'high', status: 'active' },
      { name: 'r/diabetesrecipes', rss: 'https://www.reddit.com/r/diabetesrecipes/.rss', json: 'https://www.reddit.com/r/diabetesrecipes.json', category: 'lifestyle', priority: 'high', status: 'active' },
      { name: 'r/diabetesfitness', rss: 'https://www.reddit.com/r/diabetesfitness/.rss', json: 'https://www.reddit.com/r/diabetesfitness.json', category: 'lifestyle', priority: 'high', status: 'active' }
    );

    // ===== HIGH PRIORITY - MANUFACTURER NEWS =====
    this.feeds.push(
      { name: 'Dexcom Newsroom', rss: 'https://www.dexcom.com/newsroom/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Omnipod RSS', rss: 'https://www.omnipod.com/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Medtronic Diabetes Blog', rss: 'https://www.medtronicdiabetes.com/blog/feed', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Tandem Diabetes RSS', rss: 'https://www.tandemdiabetes.com/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Abbott News RSS', rss: 'https://www.abbott.com/rss/news.xml', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Insulet RSS', rss: 'https://www.insulet.com/rss', json: '', category: 'technology', priority: 'high', status: 'active' }
    );

    // ===== HIGH PRIORITY - MAJOR DIABETES ORGANIZATIONS =====
    this.feeds.push(
      { name: 'ADA Blog', rss: 'https://www.diabetes.org/rss/blog', json: '', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'ADA Recipes', rss: 'https://www.diabetes.org/rss/recipes', json: '', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'ADA Research', rss: 'https://www.diabetes.org/rss/research', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'JDRF News', rss: 'https://www.jdrf.org/feed', json: '', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'Breakthrough T1D News', rss: 'https://www.breakthrought1d.org/news/feed', json: '', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'Breakthrough T1D Research', rss: 'https://www.breakthrought1d.org/research/feed', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'Breakthrough T1D Community', rss: 'https://www.breakthrought1d.org/community/feed', json: '', category: 'diabetes', priority: 'high', status: 'active' }
    );

    // ===== HIGH PRIORITY - RESEARCH JOURNALS =====
    this.feeds.push(
      { name: 'ADA Diabetes Care', rss: 'https://diabetesjournals.org/rss/care.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'ADA Emerging Treatments', rss: 'https://diabetesjournals.org/rss/ettr.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'ADA Clinical Diabetes', rss: 'https://diabetesjournals.org/rss/clinical.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'ADA Diabetes Spectrum', rss: 'https://diabetesjournals.org/rss/spectrum.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'BMJ DRC Current Issue', rss: 'https://drc.bmj.com/rss/current.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'BMJ DRC Most Read', rss: 'https://drc.bmj.com/rss/mostread.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'BMJ DRC Most Cited', rss: 'https://drc.bmj.com/rss/mostcited.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'Endocrine Society RSS', rss: 'https://www.endocrine.org/rss', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'J Endocrine Soc', rss: 'https://academic.oup.com/jes/rss/current.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'Endocrine Reviews', rss: 'https://academic.oup.com/edrv/rss/current.xml', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'Lancet Diabetes Endocrinology', rss: 'https://www.thelancet.com/rssfeed/lancet/diabetes-endocrinology', json: '', category: 'research', priority: 'high', status: 'active' },
      { name: 'Diabetes Research Clinical Practice', rss: 'https://www.sciencedirect.com/journal/diabetes-research-and-clinical-practice/rss', json: '', category: 'research', priority: 'high', status: 'active' }
    );

    // ===== MEDIUM PRIORITY - COMMUNITY FORUMS =====
    this.feeds.push(
      { name: 'Diabetes Forums T1D', rss: 'https://www.diabetesforums.com/forums/type-1-diabetes.7/index.rss', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Health Boards Diabetes', rss: 'https://www.healthboards.com/boards/external.php?type=RSS2&forumids=54', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes UK Forum T1D', rss: 'https://www.diabetes.co.uk/forum/category/type-1-diabetes.19/index.rss', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes UK Forum Pumps', rss: 'https://www.diabetes.co.uk/forum/category/insulin-pumps.70/index.rss', json: '', category: 'technology', priority: 'medium', status: 'active' },
      { name: 'Diabetes UK Forum CGM', rss: 'https://www.diabetes.co.uk/forum/category/continuous-glucose-monitoring.71/index.rss', json: '', category: 'technology', priority: 'medium', status: 'active' },
      { name: 'TuDiabetes Forum', rss: 'https://forum.tudiabetes.org/latest.rss', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Daily Forum', rss: 'https://www.diabetesdaily.com/forum/external.php?type=RSS2', json: '', category: 'diabetes', priority: 'medium', status: 'active' }
    );

    // ===== MEDIUM PRIORITY - DIABETES BLOGS & NEWS =====
    this.feeds.push(
      { name: 'Diabetes UK Blog', rss: 'https://www.diabetes.co.uk/blog/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes UK T1D', rss: 'https://www.diabetes.co.uk/type1-diabetes/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Voice', rss: 'https://www.diabetesvoice.org/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Strong', rss: 'https://www.diabetesstrong.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Daily Grind', rss: 'https://www.diabetesdailygrind.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Wisdom', rss: 'https://www.diabeteswisdom.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Ed Net', rss: 'https://www.diabetesed.net/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Educator', rss: 'https://www.diabeteseducator.org/rss', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'T1D Exchange Magazine', rss: 'https://t1dexchange.org/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Stories', rss: 'https://diabetesstories.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes Daily T1D', rss: 'https://www.diabetesdaily.com/type1/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'T1D Living', rss: 'https://t1dliving.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'The Savvy Diabetic', rss: 'https://thesavvydiabetic.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Beyond Type 1', rss: 'https://beyondtype1.org/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diabetes UK News', rss: 'https://www.diabetes.org.uk/rss/news', json: '', category: 'diabetes', priority: 'medium', status: 'active' }
    );

    // ===== MEDIUM PRIORITY - MEDICAL & RESEARCH =====
    this.feeds.push(
      { name: 'r/Endocrinology', rss: 'https://www.reddit.com/r/Endocrinology/.rss', json: 'https://www.reddit.com/r/Endocrinology.json', category: 'medical', priority: 'medium', status: 'active' },
      { name: 'r/medicine', rss: 'https://www.reddit.com/r/medicine/.rss', json: 'https://www.reddit.com/r/medicine.json', category: 'medical', priority: 'medium', status: 'active' },
      { name: 'r/AskDocs', rss: 'https://www.reddit.com/r/AskDocs/.rss', json: 'https://www.reddit.com/r/AskDocs.json', category: 'medical', priority: 'medium', status: 'active' },
      { name: 'r/HealthIT', rss: 'https://www.reddit.com/r/HealthIT/.rss', json: 'https://www.reddit.com/r/HealthIT.json', category: 'technology', priority: 'medium', status: 'active' },
      { name: 'r/MedicalDevices', rss: 'https://www.reddit.com/r/MedicalDevices/.rss', json: 'https://www.reddit.com/r/MedicalDevices.json', category: 'technology', priority: 'medium', status: 'active' },
      { name: 'r/ClinicalResearch', rss: 'https://www.reddit.com/r/ClinicalResearch/.rss', json: 'https://www.reddit.com/r/ClinicalResearch.json', category: 'research', priority: 'medium', status: 'active' }
    );

    // ===== MEDIUM PRIORITY - REGIONAL COMMUNITIES =====
    this.feeds.push(
      { name: 'r/diabetesUK', rss: 'https://www.reddit.com/r/diabetesUK/.rss', json: 'https://www.reddit.com/r/diabetesUK.json', category: 'regional', priority: 'medium', status: 'active' },
      { name: 'r/diabetesCanada', rss: 'https://www.reddit.com/r/diabetesCanada/.rss', json: 'https://www.reddit.com/r/diabetesCanada.json', category: 'regional', priority: 'medium', status: 'active' },
      { name: 'r/diabetes_Australia', rss: 'https://www.reddit.com/r/diabetes_Australia/.rss', json: 'https://www.reddit.com/r/diabetes_Australia.json', category: 'regional', priority: 'medium', status: 'active' },
      { name: 'r/diabetesIndia', rss: 'https://www.reddit.com/r/diabetesIndia/.rss', json: 'https://www.reddit.com/r/diabetesIndia.json', category: 'regional', priority: 'medium', status: 'active' },
      { name: 'r/diabetesPhilippines', rss: 'https://www.reddit.com/r/diabetesPhilippines/.rss', json: 'https://www.reddit.com/r/diabetesPhilippines.json', category: 'regional', priority: 'medium', status: 'active' },
      { name: 'r/diabetesBrasil', rss: 'https://www.reddit.com/r/diabetesBrasil/.rss', json: 'https://www.reddit.com/r/diabetesBrasil.json', category: 'regional', priority: 'medium', status: 'active' },
      { name: 'r/diabetesDE', rss: 'https://www.reddit.com/r/diabetesDE/.rss', json: 'https://www.reddit.com/r/diabetesDE.json', category: 'regional', priority: 'medium', status: 'active' }
    );

    // ===== MEDIUM PRIORITY - HEALTH & WELLNESS =====
    this.feeds.push(
      { name: 'r/ChronicIllness', rss: 'https://www.reddit.com/r/ChronicIllness/.rss', json: 'https://www.reddit.com/r/ChronicIllness.json', category: 'medical', priority: 'medium', status: 'active' },
      { name: 'r/Autoimmune', rss: 'https://www.reddit.com/r/Autoimmune/.rss', json: 'https://www.reddit.com/r/Autoimmune.json', category: 'medical', priority: 'medium', status: 'active' },
      { name: 'r/HealthAnxiety', rss: 'https://www.reddit.com/r/HealthAnxiety/.rss', json: 'https://www.reddit.com/r/HealthAnxiety.json', category: 'medical', priority: 'medium', status: 'active' },
      { name: 'r/nutrition', rss: 'https://www.reddit.com/r/nutrition/.rss', json: 'https://www.reddit.com/r/nutrition.json', category: 'lifestyle', priority: 'medium', status: 'active' },
      { name: 'r/Supplements', rss: 'https://www.reddit.com/r/Supplements/.rss', json: 'https://www.reddit.com/r/Supplements.json', category: 'lifestyle', priority: 'medium', status: 'active' },
      { name: 'r/fitness', rss: 'https://www.reddit.com/r/fitness/.rss', json: 'https://www.reddit.com/r/fitness.json', category: 'lifestyle', priority: 'medium', status: 'active' }
    );

    // ===== LOW PRIORITY - GENERAL HEALTH & SCIENCE =====
    this.feeds.push(
      { name: 'r/science', rss: 'https://www.reddit.com/r/science/.rss', json: 'https://www.reddit.com/r/science.json', category: 'research', priority: 'low', status: 'active' },
      { name: 'r/biology', rss: 'https://www.reddit.com/r/biology/.rss', json: 'https://www.reddit.com/r/biology.json', category: 'research', priority: 'low', status: 'active' },
      { name: 'r/neuroscience', rss: 'https://www.reddit.com/r/neuroscience/.rss', json: 'https://www.reddit.com/r/neuroscience.json', category: 'research', priority: 'low', status: 'active' },
      { name: 'r/genetics', rss: 'https://www.reddit.com/r/genetics/.rss', json: 'https://www.reddit.com/r/genetics.json', category: 'research', priority: 'low', status: 'active' },
      { name: 'r/bioinformatics', rss: 'https://www.reddit.com/r/bioinformatics/.rss', json: 'https://www.reddit.com/r/bioinformatics.json', category: 'research', priority: 'low', status: 'active' },
      { name: 'r/opendata', rss: 'https://www.reddit.com/r/opendata/.rss', json: 'https://www.reddit.com/r/opendata.json', category: 'research', priority: 'low', status: 'active' }
    );

    // ===== LOW PRIORITY - GOOGLE NEWS SEARCHES (ENGLISH) =====
    this.feeds.push(
      { name: 'Google News T1D US', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=en-US&gl=US&ceid=US:en', json: '', category: 'general', priority: 'low', status: 'active' },
      { name: 'Google News Dexcom US', rss: 'https://news.google.com/rss/search?q=Dexcom&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Omnipod US', rss: 'https://news.google.com/rss/search?q=Omnipod&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Tandem US', rss: 'https://news.google.com/rss/search?q=Tandem%20t:slim&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Medtronic US', rss: 'https://news.google.com/rss/search?q=Medtronic%20insulin%20pump&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Libre 3 US', rss: 'https://news.google.com/rss/search?q=Libre%203&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Control-IQ US', rss: 'https://news.google.com/rss/search?q=Control-IQ&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News iLet US', rss: 'https://news.google.com/rss/search?q=iLet%20bionic%20pancreas&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' }
    );

    // ===== LOW PRIORITY - GOOGLE NEWS SEARCHES (INTERNATIONAL) =====
    this.feeds.push(
      { name: 'Google News T1D Arabic', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=ar&gl=AE&ceid=AE:ar', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Hebrew', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=he&gl=IL&ceid=IL:he', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Thai', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=th&gl=TH&ceid=TH:th', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Vietnamese', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=vi&gl=VN&ceid=VN:vi', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Indonesian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=id&gl=ID&ceid=ID:id', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Malay', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=ms&gl=MY&ceid=MY:ms', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Persian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=fa&gl=IR&ceid=IR:fa', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Ukrainian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=uk&gl=UA&ceid=UA:uk', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Estonian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=et&gl=EE&ceid=EE:et', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Latvian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=lv&gl=LV&ceid=LV:lv', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Turkish', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=tr-TR&gl=TR&ceid=TR:tr', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Greek', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=el-GR&gl=GR&ceid=GR:el', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Czech', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=cs-CZ&gl=CZ&ceid=CZ:cs', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Hungarian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=hu-HU&gl=HU&ceid=HU:hu', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Romanian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=ro-RO&gl=RO&ceid=RO:ro', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Slovak', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=sk-SK&gl=SK&ceid=SK:sk', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Slovenian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=sl-SI&gl=SI&ceid=SI:sl', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Croatian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=hr-HR&gl=HR&ceid=HR:hr', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Bulgarian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=bg-BG&gl=BG&ceid=BG:bg', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Lithuanian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=lt-LT&gl=LT&ceid=LT:lt', json: '', category: 'regional', priority: 'low', status: 'active' }
    );

    // ===== LOW PRIORITY - GOOGLE NEWS SEARCHES (EUROPEAN LANGUAGES) =====
    this.feeds.push(
      { name: 'Google News T1D Spanish LatAm', rss: 'https://news.google.com/rss/search?q=%22diabetes%20tipo%201%22&hl=es-419&gl=MX&ceid=MX:es-419', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Spanish Spain', rss: 'https://news.google.com/rss/search?q=%22diabetes%20tipo%201%22&hl=es-ES&gl=ES&ceid=ES:es', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D French', rss: 'https://news.google.com/rss/search?q=%22diab%C3%A8te%20de%20type%201%22&hl=fr-FR&gl=FR&ceid=FR:fr', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D German', rss: 'https://news.google.com/rss/search?q=%22Typ-1-Diabetes%22&hl=de-DE&gl=DE&ceid=DE:de', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Portuguese Brazil', rss: 'https://news.google.com/rss/search?q=%22diabetes%20tipo%201%22&hl=pt-BR&gl=BR&ceid=BR:pt-419', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Portuguese Portugal', rss: 'https://news.google.com/rss/search?q=%22diabetes%20tipo%201%22&hl=pt-PT&gl=PT&ceid=PT:pt-PT', json: '', category: 'regional', priority: 'low', status: 'active' }
    );

    // ===== ADDITIONAL MANUFACTURER & TECHNOLOGY FEEDS =====
    this.feeds.push(
      { name: 'Google News Dexcom US', rss: 'https://news.google.com/rss/search?q=Dexcom&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Omnipod US', rss: 'https://news.google.com/rss/search?q=Omnipod&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Tandem t:slim US', rss: 'https://news.google.com/rss/search?q=Tandem%20t:slim&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Medtronic Insulin Pump US', rss: 'https://news.google.com/rss/search?q=Medtronic%20insulin%20pump&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Libre 3 US', rss: 'https://news.google.com/rss/search?q=Libre%203&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News Control-IQ US', rss: 'https://news.google.com/rss/search?q=Control-IQ&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' },
      { name: 'Google News iLet Bionic Pancreas US', rss: 'https://news.google.com/rss/search?q=iLet%20bionic%20pancreas&hl=en-US&gl=US&ceid=US:en', json: '', category: 'technology', priority: 'low', status: 'active' }
    );

    // ===== ADDITIONAL DIABETES BLOGS & NEWS SOURCES =====
    this.feeds.push(
      { name: 'Insulin Nation', rss: 'https://insulinnation.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'ASweetLife', rss: 'https://asweetlife.org/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'MyGlu', rss: 'https://myglu.org/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Diatribe', rss: 'https://diatribe.org/rss.xml', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Children With Diabetes', rss: 'https://www.childrenwithdiabetes.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'DiabetesMine', rss: 'https://www.healthline.com/diabetesmine/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' },
      { name: 'Sugar Surfing', rss: 'https://sugarsurfing.com/feed', json: '', category: 'diabetes', priority: 'medium', status: 'active' }
    );

    // ===== ADDITIONAL RESEARCH & CLINICAL JOURNALS =====
    this.feeds.push(
      { name: 'Diabetologia Latest Articles', rss: 'https://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=125', json: '', category: 'research', priority: 'medium', status: 'active' },
      { name: 'Frontiers in Endocrinology Diabetes', rss: 'https://www.frontiersin.org/journals/endocrinology/rss', json: '', category: 'research', priority: 'medium', status: 'active' },
      { name: 'Nature Reviews Endocrinology', rss: 'https://www.nature.com/nrendo.rss', json: '', category: 'research', priority: 'medium', status: 'active' }
    );

    // ===== ADDITIONAL REGIONAL & LANGUAGE FEEDS =====
    this.feeds.push(
      { name: 'Google News T1D Turkish', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=tr-TR&gl=TR&ceid=TR:tr', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Greek', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=el-GR&gl=GR&ceid=GR:el', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Czech', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=cs-CZ&gl=CZ&ceid=CZ:cs', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Hungarian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=hu-HU&gl=HU&ceid=HU:hu', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Romanian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=ro-RO&gl=RO&ceid=RO:ro', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Slovak', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=sk-SK&gl=SK&ceid=SK:sk', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Slovenian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=sl-SI&gl=SI&ceid=SI:sl', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Croatian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=hr-HR&gl=HR&ceid=HR:hr', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Bulgarian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=bg-BG&gl=BG&ceid=BG:bg', json: '', category: 'regional', priority: 'low', status: 'active' },
      { name: 'Google News T1D Lithuanian', rss: 'https://news.google.com/rss/search?q=%22type%201%20diabetes%22&hl=lt-LT&gl=LT&ceid=LT:lt', json: '', category: 'regional', priority: 'low', status: 'active' }
    );

    // Initialize all feeds as active
    this.feeds.forEach(feed => {
      feed.status = 'active';
      feed.lastFetched = undefined;
    });
  }

  public async fetchAllFeeds(): Promise<RSSFeedContent[]> {
    const allContent: RSSFeedContent[] = [];
    
    // Process feeds by priority
    const highPriority = this.feeds.filter(f => f.priority === 'high');
    const mediumPriority = this.feeds.filter(f => f.priority === 'medium');
    const lowPriority = this.feeds.filter(f => f.priority === 'low');

    // Fetch high priority feeds first
    for (const feed of highPriority) {
      try {
        const content = await this.fetchFeed(feed);
        if (content.length > 0) {
          allContent.push(...content);
          this.contentCache.set(feed.name, content);
          feed.lastFetched = new Date();
          feed.status = 'active';
        }
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        feed.status = 'error';
      }
    }

    // Fetch medium priority feeds
    for (const feed of mediumPriority) {
      try {
        const content = await this.fetchFeed(feed);
        if (content.length > 0) {
          allContent.push(...content);
          this.contentCache.set(feed.name, content);
          feed.lastFetched = new Date();
          feed.status = 'active';
        }
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        feed.status = 'error';
      }
    }

    // Fetch low priority feeds (if time permits)
    for (const feed of lowPriority) {
      try {
        const content = await this.fetchFeed(feed);
        if (content.length > 0) {
          allContent.push(...content);
          this.contentCache.set(feed.name, content);
          feed.lastFetched = new Date();
          feed.status = 'active';
        }
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        feed.status = 'error';
      }
    }

    return allContent;
  }

  private async fetchFeed(feed: RSSFeed): Promise<RSSFeedContent[]> {
    try {
      // Try JSON API first (more reliable)
      const response = await fetch(feed.json);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseRedditJSON(data, feed);
    } catch (error) {
      console.warn(`JSON fetch failed for ${feed.name}, trying RSS:`, error);
      
      // Fallback to RSS if JSON fails
      try {
        const response = await fetch(feed.rss);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        return this.parseRSSFeed(text, feed);
      } catch (rssError) {
        console.error(`RSS fetch also failed for ${feed.name}:`, rssError);
        return [];
      }
    }
  }

  private parseRedditJSON(data: any, feed: RSSFeed): RSSFeedContent[] {
    const posts: RSSFeedContent[] = [];
    
    if (data.data && data.data.children) {
      for (const child of data.data.children) {
        const post = child.data;
        if (post && post.title && post.selftext) {
          posts.push({
            id: post.id,
            title: post.title,
            content: post.selftext || post.title,
            author: post.author || 'anonymous',
            timestamp: new Date(post.created_utc * 1000),
            source: feed.name,
            category: feed.category,
            url: `https://reddit.com${post.permalink}`,
            engagement: {
              upvotes: post.ups || 0,
              comments: post.num_comments || 0,
              score: post.score || 0
            },
            keywords: this.extractKeywords(post.title + ' ' + post.selftext),
            sentiment: this.analyzeSentiment(post.title + ' ' + post.selftext)
          });
        }
      }
    }

    return posts;
  }

  private parseRSSFeed(xmlText: string, feed: RSSFeed): RSSFeedContent[] {
    const posts: RSSFeedContent[] = [];
    
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      
      for (const item of items) {
        const title = item.querySelector('title')?.textContent || '';
        const content = item.querySelector('description')?.textContent || title;
        const author = item.querySelector('author')?.textContent || 'anonymous';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        
        if (title && content) {
          posts.push({
            id: this.generateId(title + content),
            title,
            content,
            author,
            timestamp: new Date(pubDate || Date.now()),
            source: feed.name,
            category: feed.category,
            url: link,
            keywords: this.extractKeywords(title + ' ' + content),
            sentiment: this.analyzeSentiment(title + ' ' + content)
          });
        }
      }
    } catch (error) {
      console.error(`Error parsing RSS for ${feed.name}:`, error);
    }

    return posts;
  }

  private extractKeywords(text: string): string[] {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const keywordCounts = new Map<string, number>();
    words.forEach(word => {
      keywordCounts.set(word, (keywordCounts.get(word) || 0) + 1);
    });
    
    return Array.from(keywordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['help', 'improve', 'better', 'good', 'great', 'amazing', 'wonderful', 'effective', 'success', 'positive'];
    const negativeWords = ['problem', 'issue', 'bad', 'terrible', 'awful', 'difficult', 'struggle', 'pain', 'negative', 'worse'];
    
    const lowerText = text.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private generateId(text: string): string {
    return btoa(text).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
  }

  public getFeedsByCategory(category: string): RSSFeed[] {
    return this.feeds.filter(feed => feed.category === category);
  }

  public getFeedsByPriority(priority: string): RSSFeed[] {
    return this.feeds.filter(feed => feed.priority === priority);
  }

  public getFeedStatus(): { total: number; active: number; error: number; lastUpdated: Date | null } {
    const total = this.feeds.length;
    const active = this.feeds.filter(f => f.status === 'active').length;
    const error = this.feeds.filter(f => f.status === 'error').length;
    const lastUpdated = this.feeds.reduce((latest, feed) => {
      if (feed.lastFetched && (!latest || feed.lastFetched > latest)) {
        return feed.lastFetched;
      }
      return latest;
    }, null as Date | null);

    return { total, active, error, lastUpdated };
  }

  public getCachedContent(feedName: string): RSSFeedContent[] {
    return this.contentCache.get(feedName) || [];
  }

  public getAllCachedContent(): RSSFeedContent[] {
    const allContent: RSSFeedContent[] = [];
    for (const content of this.contentCache.values()) {
      allContent.push(...content);
    }
    return allContent;
  }

  public clearCache(): void {
    this.contentCache.clear();
  }

  public async refreshFeed(feedName: string): Promise<RSSFeedContent[]> {
    const feed = this.feeds.find(f => f.name === feedName);
    if (!feed) {
      throw new Error(`Feed ${feedName} not found`);
    }

    const content = await this.fetchFeed(feed);
    if (content.length > 0) {
      this.contentCache.set(feedName, content);
      feed.lastFetched = new Date();
      feed.status = 'active';
    }

    return content;
  }
}
