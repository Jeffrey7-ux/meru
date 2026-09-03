package com.meru.heritage.service;

import com.meru.heritage.model.Section;
import com.meru.heritage.model.Word;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Holds all of the bilingual (English / Kiswahili) content for the site.
 *
 * This is a direct Spring-ified port of the plain-Java ContentData class:
 * same text, same structure — the only difference is that it now returns
 * real Java objects (Section, Word) instead of hand-built JSON strings,
 * because Spring's ContentController + Jackson handle the JSON conversion
 * for us automatically.
 *
 * @Service marks this class as a Spring-managed bean, so Spring creates
 * one instance of it and hands it to ContentController automatically
 * (see the constructor in ContentController) — this is "dependency
 * injection", one of Spring's core ideas.
 */
@Service
public class ContentService {

    // =====================================================================
    // HISTORY
    // =====================================================================

    public List<Section> getHistory(String lang) {
        List<Section> sections = new ArrayList<>();

        if ("sw".equals(lang)) {
            sections.add(new Section(
                    "Asili na Uhamiaji",
                    Arrays.asList(
                            "Wameru (pia hujulikana kama Warwa au Rwa) ni kabila la Kibantu linaloishi kwenye miteremko ya Mlima Meru, Mkoa wa Arusha, Tanzania. Kwa mujibu wa historia simulizi, mababu wa Wameru walifika kwenye miteremko ya Mlima Meru karne kadhaa zilizopita, huku baadhi ya vyanzo vikieleza uhusiano wa kihistoria na jamii za Kichagga za Machame na Siha zilizoko Mlima Kilimanjaro.",
                            "Walipofika kwenye miteremko ya kusini-mashariki ya mlima huo, walikutana na kundi la wawindaji-wakusanyaji lililojulikana kama Wakoningo, ambao hatimaye waliungana na jamii ya Wameru."
                    )
            ));
            sections.add(new Section(
                    "Uongozi wa Rari II (Ndemi)",
                    Arrays.asList(
                            "Miongoni mwa viongozi wanaokumbukwa zaidi na Wameru ni Rari II, aliyejulikana pia kama Ndemi, aliyetawala hadi mwaka 1887. Anasifiwa kwa mchango wake katika kuendeleza kilimo — akianzisha mazao kama ulezi, mahindi na ndizi — pamoja na kukuza ufundi wa ufinyanzi na uhunzi (kazi za chuma) miongoni mwa jamii yake."
                    )
            ));
            sections.add(new Section(
                    "Kipindi cha Ukoloni",
                    Arrays.asList(
                            "Mwaka 1896, utawala wa Kijerumani ulifanya mashambulizi ya kuadhibu dhidi ya jamii za Waarusha na Wameru, yaliyosababisha vifo, unyang'anyi wa mifugo, na uchomaji wa mashamba ya ndizi ili kupisha wakulima Wazungu kumiliki ardhi hiyo yenye rutuba.",
                            "Baada ya Vita vya Kwanza vya Dunia, utawala wa Kiingereza ulipoanza mwaka 1916, Wameru walianza kupanua makazi na mashamba yao. Kufikia miaka ya 1920, kahawa ilikuwa imekuwa zao muhimu zaidi la biashara miongoni mwa wakulima Wameru, pamoja na ndizi, mahindi na maharage."
                    )
            ));
            sections.add(new Section(
                    "Enzi ya Uhuru na Sasa",
                    Arrays.asList(
                            "Baada ya uhuru wa Tanganyika, sera za Serikali chini ya Mwalimu Julius Nyerere za miaka ya 1960 zililenga kuunganisha taifa moja lenye lugha moja ya Kiswahili na tamaduni za pamoja. Hii ilichangia kudhoofika taratibu kwa baadhi ya mifumo ya kikoo iliyokuwepo awali.",
                            "Leo hii, eneo la asili la Wameru linajumuisha Wilaya ya Meru katika Mkoa wa Arusha, iliyoanzishwa rasmi mwaka 2007, ambayo inabeba jina la jamii hii kwa heshima. Wameru wanaendelea kuwa sehemu muhimu ya jamii ya Arusha na Tanzania kwa ujumla."
                    )
            ));
        } else {
            sections.add(new Section(
                    "Origins and Migration",
                    Arrays.asList(
                            "The Meru (also known as Wameru, Rwa, or Rwo) are a Bantu-speaking people living on the slopes of Mount Meru in Arusha Region, Tanzania. Oral tradition and historical research trace their ancestors to migrations onto the mountain's slopes several centuries ago, with several accounts linking them to the Machame and Siha communities of the Chagga people on nearby Mount Kilimanjaro.",
                            "When they settled on the southeastern slopes of Mount Meru, they encountered an earlier hunter-gatherer community known as the Koningo, who were gradually absorbed into Meru society."
                    )
            ));
            sections.add(new Section(
                    "Leadership of Rari II (Ndemi)",
                    Arrays.asList(
                            "One of the most remembered leaders in Meru history is Rari II, also known as Ndemi, who ruled until 1887. He is credited with major contributions to agriculture — introducing crops such as millet, maize, and bananas — as well as encouraging pottery-making and ironworking within the community."
                    )
            ));
            sections.add(new Section(
                    "The Colonial Period",
                    Arrays.asList(
                            "In 1896, German colonial forces launched punitive expeditions against both the Arusha and Meru peoples. Many people were killed, cattle were confiscated, and banana groves were burned to clear fertile land for European settler farms.",
                            "After the First World War, British colonial rule began in 1916, and the Meru actively expanded their settlements and farmland. By the 1920s, coffee had become the most valuable cash crop among Meru farmers, grown alongside bananas, maize, and beans."
                    )
            ));
            sections.add(new Section(
                    "Independence and the Present Day",
                    Arrays.asList(
                            "Following Tanganyika's independence, government policy under Julius Nyerere in the 1960s emphasized building a single Tanzanian nation united by the Swahili language and shared national culture. Over time, this contributed to the gradual weakening of some traditional clan structures.",
                            "Today, the Meru homeland forms the core of Meru District in Arusha Region, formally established in 2007 and named in honor of the community. The Meru people remain an important part of Arusha's and Tanzania's social and economic life."
                    )
            ));
        }

        return sections;
    }

    // =====================================================================
    // CULTURE
    // =====================================================================

    public List<Section> getCulture(String lang) {
        List<Section> sections = new ArrayList<>();

        if ("sw".equals(lang)) {
            sections.add(new Section(
                    "Wameru ni Nani?",
                    Arrays.asList(
                            "Wameru ni jamii ya Kibantu wenye takriban watu 200,000, wanaoishi hasa kwenye miteremko ya kusini na mashariki ya Mlima Meru, Wilaya ya Meru, Mkoa wa Arusha. Mara nyingi hujiita 'Varwa', neno la Kimeru lenye maana ya 'wale wanaopanda' — likirejelea miteremko ya mlima wanamoishi."
                    )
            ));
            sections.add(new Section(
                    "Lugha",
                    Arrays.asList(
                            "Lugha ya asili ya Wameru ni Kimeru (pia hujulikana kama Kirwa), lugha ya Kibantu inayohusiana kwa karibu na lahaja za Kichagga za Kilimanjaro Magharibi. Kiswahili, lugha ya taifa ya Tanzania, kinatumika sana kwa mawasiliano ya kila siku, elimu na shughuli za kiserikali."
                    )
            ));
            sections.add(new Section(
                    "Kilimo na Uchumi",
                    Arrays.asList(
                            "Wameru wanajulikana kwa kilimo cha bidii kwenye ardhi yenye rutuba ya volkano ya Mlima Meru. Kahawa imekuwa zao kuu la biashara tangu miaka ya 1920, likikua bega kwa bega na ndizi, mahindi na maharage. Ufugaji wa mifugo pia una nafasi muhimu katika maisha ya kiuchumi na kijamii."
                    )
            ));
            sections.add(new Section(
                    "Mfumo wa Kijamii",
                    Arrays.asList(
                            "Kijadi, jamii ya Wameru iliundwa na koo mbalimbali, baadhi zikijitambulisha na asili ya Kimaasai, na mfumo wa rika (makundi ya umri) uliopanga majukumu ya kijamii na ulinzi. Ingawa mifumo hii imepungua nguvu baada ya miaka ya sera za taifa moja, bado inaheshimika katika kumbukumbu za jamii."
                    )
            ));
            sections.add(new Section(
                    "Dini na Imani",
                    Arrays.asList(
                            "Wameru wengi wa leo ni Wakristo (madhehebu ya Kilutheri na Kikatoliki yakiwa makubwa zaidi), huku wachache wakiwa Waislamu. Kihistoria, ukristo ulipokelewa kwa upinzani mkali kutoka kwa jamii, kabla ya kuenea taratibu katika karne ya 20."
                    )
            ));
            sections.add(new Section(
                    "Mlima Meru na Utalii",
                    Arrays.asList(
                            "Mlima Meru, volkano ya pili kwa urefu Tanzania (mita 4,566), ni kivutio muhimu cha utalii ndani ya Hifadhi ya Taifa ya Arusha na ni sehemu ya kiroho na kiuchumi ya maisha ya Wameru — ardhi yenye rutuba kutokana na majivu ya volkano ndiyo msingi wa kilimo chao."
                    )
            ));
        } else {
            sections.add(new Section(
                    "Who Are the Meru People?",
                    Arrays.asList(
                            "The Meru are a Bantu ethnic group of roughly 200,000 people, living mainly on the southern and eastern slopes of Mount Meru, in Meru District, Arusha Region. They often call themselves 'Varwa', a Kimeru word meaning 'those who climb' — a reference to the mountain slopes they call home."
                    )
            ));
            sections.add(new Section(
                    "Language",
                    Arrays.asList(
                            "The Meru's own language is Kimeru (also called Kirwa), a Bantu language closely related to dialects of the Chagga language spoken on western Kilimanjaro. Kiswahili, Tanzania's national language, is widely used for everyday communication, education, and government affairs."
                    )
            ));
            sections.add(new Section(
                    "Agriculture and Economy",
                    Arrays.asList(
                            "The Meru are known as industrious farmers, cultivating the fertile volcanic soils of Mount Meru. Coffee has been the leading cash crop since the 1920s, grown alongside bananas, maize, and beans. Livestock keeping also plays an important role in economic and social life."
                    )
            ));
            sections.add(new Section(
                    "Social Organization",
                    Arrays.asList(
                            "Traditionally, Meru society was organized around clans — some of which trace their ancestry to Maasai origins — and an age-set system that structured social responsibilities and defense roles. While these structures weakened after mid-20th-century nation-building policies, they remain part of the community's collective memory."
                    )
            ));
            sections.add(new Section(
                    "Religion and Beliefs",
                    Arrays.asList(
                            "Most Meru today are Christian (predominantly Lutheran and Catholic), with a smaller Muslim minority. Historically, Christian missionaries faced strong resistance from the community before the faith gradually spread through the 20th century."
                    )
            ));
            sections.add(new Section(
                    "Mount Meru and Tourism",
                    Arrays.asList(
                            "Mount Meru, Tanzania's second-highest peak at 4,566 metres, is a major attraction within Arusha National Park and remains central to Meru life both spiritually and economically — its volcanic soil is the foundation of the community's farming tradition."
                    )
            ));
        }

        return sections;
    }

    // =====================================================================
    // DICTIONARY
    // =====================================================================

    public List<Word> getDictionary(String lang) {
        boolean sw = "sw".equals(lang);
        List<Word> words = new ArrayList<>();

        words.add(word("Mlima", "Mountain",
                "Refers to Mount Meru, the community's ancestral home.",
                "Inarejelea Mlima Meru, makazi ya asili ya jamii hii.",
                "Nature", "Asili", sw));
        words.add(word("Ukoo", "Clan",
                "A kinship group tracing descent from a common ancestor.",
                "Kundi la kikoo linalotokana na babu au bibi mmoja wa pamoja.",
                "Society", "Jamii", sw));
        words.add(word("Rika", "Age-set / age-group",
                "A group of people initiated together, sharing social duties.",
                "Kundi la watu walioanzishwa pamoja, wenye majukumu ya pamoja ya kijamii.",
                "Society", "Jamii", sw));
        words.add(word("Mzee", "Elder",
                "A respected senior member of the community.",
                "Mwanajamii mzima anayeheshimika.",
                "Society", "Jamii", sw));
        words.add(word("Baraza", "Council / gathering",
                "A meeting where elders or leaders discuss community matters.",
                "Mkutano ambapo wazee au viongozi hujadili mambo ya jamii.",
                "Society", "Jamii", sw));
        words.add(word("Chifu", "Chief",
                "A traditional or customary community leader.",
                "Kiongozi wa kimila au kimapokeo wa jamii.",
                "Society", "Jamii", sw));
        words.add(word("Shamba", "Farm",
                "Cultivated land, central to Meru livelihoods.",
                "Ardhi ya kilimo, msingi wa maisha ya Wameru.",
                "Agriculture", "Kilimo", sw));
        words.add(word("Kahawa", "Coffee",
                "The leading cash crop grown on Mount Meru's slopes since the 1920s.",
                "Zao kuu la biashara linalolimwa miteremko ya Mlima Meru tangu miaka ya 1920.",
                "Agriculture", "Kilimo", sw));
        words.add(word("Ndizi", "Banana",
                "A staple food and traditional crop of the mountain slopes.",
                "Chakula kikuu na zao la asili la miteremko ya mlima.",
                "Agriculture", "Kilimo", sw));
        words.add(word("Mahindi", "Maize",
                "A staple food crop introduced generations ago.",
                "Zao kuu la chakula lililoletwa vizazi vilivyopita.",
                "Agriculture", "Kilimo", sw));
        words.add(word("Maharage", "Beans",
                "A staple food crop commonly grown alongside maize.",
                "Zao la chakula linalolimwa pamoja na mahindi.",
                "Agriculture", "Kilimo", sw));
        words.add(word("Mifugo", "Livestock",
                "Cattle, goats, and other animals kept for wealth and food.",
                "Ng'ombe, mbuzi na wanyama wengine wafugwao kwa utajiri na chakula.",
                "Agriculture", "Kilimo", sw));
        words.add(word("Jando", "Male initiation rite",
                "A traditional rite of passage marking transition to adulthood.",
                "Ibada ya kimila inayoashiria kuingia utu uzima kwa wavulana.",
                "Tradition", "Mila", sw));
        words.add(word("Unyago", "Female initiation rite",
                "A traditional rite of passage for young women.",
                "Ibada ya kimila kwa wasichana wanaoingia utu uzima.",
                "Tradition", "Mila", sw));
        words.add(word("Ngoma", "Traditional dance / drum",
                "Music and dance performed during celebrations and ceremonies.",
                "Muziki na ngoma zinazochezwa kwenye sherehe na matukio.",
                "Tradition", "Mila", sw));
        words.add(word("Sherehe", "Celebration / ceremony",
                "A festive event marking important community occasions.",
                "Tukio la furaha linaloadhimisha matukio muhimu ya jamii.",
                "Tradition", "Mila", sw));
        words.add(word("Mila na Desturi", "Customs and traditions",
                "The inherited practices and norms of the community.",
                "Desturi na kanuni za jamii zilizorithiwa vizazi hadi vizazi.",
                "Tradition", "Mila", sw));
        words.add(word("Dini", "Religion",
                "Spiritual belief and practice; most Meru today are Christian.",
                "Imani na desturi za kiroho; Wameru wengi wa leo ni Wakristo.",
                "Belief", "Imani", sw));
        words.add(word("Pombe ya Asili", "Traditional local brew",
                "Locally made fermented drink, often banana-based, used in social occasions.",
                "Kinywaji cha asili kilichochachushwa, mara nyingi cha ndizi, kwa matukio ya kijamii.",
                "Food & Drink", "Chakula na Vinywaji", sw));
        words.add(word("Wilaya", "District",
                "An administrative area — Meru District is named after the community.",
                "Eneo la kiutawala — Wilaya ya Meru imepewa jina la jamii hii.",
                "Geography", "Jiografia", sw));
        words.add(word("Mkoa", "Region",
                "A larger administrative area — the Meru homeland lies in Arusha Region.",
                "Eneo kubwa la kiutawala — makazi ya asili ya Wameru yapo Mkoa wa Arusha.",
                "Geography", "Jiografia", sw));
        words.add(word("Varwa", "\"Those who climb\"",
                "A name the Meru sometimes use for themselves, in the Kimeru language.",
                "Jina ambalo Wameru hujiita wenyewe kwa lugha ya Kimeru.",
                "Identity", "Utambulisho", sw));

        return words;
    }

    /**
     * Builds one Word, picking the English or Kiswahili note/category
     * depending on the current UI language. "term" and "meaning" don't
     * change — they ARE the Kiswahili headword and its English gloss,
     * which is the whole point of the dictionary.
     */
    private Word word(String term, String meaningEn,
                       String noteEn, String noteSw,
                       String categoryEn, String categorySw,
                       boolean sw) {
        return new Word(term, meaningEn, sw ? noteSw : noteEn, sw ? categorySw : categoryEn);
    }
}
