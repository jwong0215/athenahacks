import { useState, useEffect, useRef } from "react";

const SCHOOLS = [
  // ── Hong Kong ──
  { name: "The University of Hong Kong", country: "Hong Kong", level: "University" },
  { name: "The Chinese University of Hong Kong", country: "Hong Kong", level: "University" },
  { name: "Hong Kong University of Science and Technology", country: "Hong Kong", level: "University" },
  { name: "The Hong Kong Polytechnic University", country: "Hong Kong", level: "University" },
  { name: "City University of Hong Kong", country: "Hong Kong", level: "University" },
  { name: "Hong Kong Baptist University", country: "Hong Kong", level: "University" },
  { name: "Lingnan University", country: "Hong Kong", level: "University" },
  { name: "The Education University of Hong Kong", country: "Hong Kong", level: "University" },
  { name: "The Open University of Hong Kong", country: "Hong Kong", level: "University" },
  { name: "Hong Kong Shue Yan University", country: "Hong Kong", level: "University" },
  { name: "Hang Seng University of Hong Kong", country: "Hong Kong", level: "University" },
  { name: "Caritas Institute of Higher Education", country: "Hong Kong", level: "University" },
  { name: "Hong Kong Institute of Vocational Education", country: "Hong Kong", level: "University" },
  { name: "St. Paul's College", country: "Hong Kong", level: "High School" },
  { name: "Queen's College Hong Kong", country: "Hong Kong", level: "High School" },
  { name: "King's College Hong Kong", country: "Hong Kong", level: "High School" },
  { name: "Diocesan Boys' School", country: "Hong Kong", level: "High School" },
  { name: "Diocesan Girls' School", country: "Hong Kong", level: "High School" },
  { name: "La Salle College", country: "Hong Kong", level: "High School" },
  { name: "St. Joseph's College Hong Kong", country: "Hong Kong", level: "High School" },
  { name: "Wah Yan College Kowloon", country: "Hong Kong", level: "High School" },
  { name: "Wah Yan College Hong Kong", country: "Hong Kong", level: "High School" },
  { name: "Marymount Secondary School", country: "Hong Kong", level: "High School" },
  { name: "St. Paul's Convent School", country: "Hong Kong", level: "High School" },
  { name: "Maryknoll Convent School", country: "Hong Kong", level: "High School" },
  { name: "Pui Ching Middle School", country: "Hong Kong", level: "High School" },
  { name: "Baptist Lui Ming Choi Secondary School", country: "Hong Kong", level: "High School" },
  { name: "HKMA David Li Kwok Po College", country: "Hong Kong", level: "High School" },
  { name: "St. Stephen's College Hong Kong", country: "Hong Kong", level: "High School" },
  { name: "Ying Wa College", country: "Hong Kong", level: "High School" },
  { name: "Ying Wa Girls' School", country: "Hong Kong", level: "High School" },
  { name: "Belilios Public School", country: "Hong Kong", level: "High School" },
  { name: "True Light Middle School of Hong Kong", country: "Hong Kong", level: "High School" },
  { name: "Po Leung Kuk Celine Ho Yam Tong College", country: "Hong Kong", level: "High School" },
  { name: "CCC Kei Wan Primary School", country: "Hong Kong", level: "Primary School" },
  { name: "Pui Kiu Primary School", country: "Hong Kong", level: "Primary School" },
  { name: "St. Catherine's Primary School Hong Kong", country: "Hong Kong", level: "Primary School" },
  { name: "Maryknoll Fathers' School Primary Section", country: "Hong Kong", level: "Primary School" },

  // ── Taiwan ──
  { name: "National Taiwan University", country: "Taiwan", level: "University" },
  { name: "National Cheng Kung University", country: "Taiwan", level: "University" },
  { name: "National Yang Ming Chiao Tung University", country: "Taiwan", level: "University" },
  { name: "National Tsing Hua University", country: "Taiwan", level: "University" },
  { name: "National Chengchi University", country: "Taiwan", level: "University" },
  { name: "Taipei Medical University", country: "Taiwan", level: "University" },
  { name: "Fu Jen Catholic University", country: "Taiwan", level: "University" },
  { name: "Tamkang University", country: "Taiwan", level: "University" },

  // ── China ──
  { name: "Peking University", country: "China", level: "University" },
  { name: "Tsinghua University", country: "China", level: "University" },
  { name: "Fudan University", country: "China", level: "University" },
  { name: "Zhejiang University", country: "China", level: "University" },
  { name: "Shanghai Jiao Tong University", country: "China", level: "University" },
  { name: "Nanjing University", country: "China", level: "University" },
  { name: "Sun Yat-sen University", country: "China", level: "University" },
  { name: "Wuhan University", country: "China", level: "University" },
  { name: "Renmin University of China", country: "China", level: "University" },
  { name: "Tongji University", country: "China", level: "University" },

  // ── United States ──
  { name: "Harvard University", country: "United States", level: "University" },
  { name: "Stanford University", country: "United States", level: "University" },
  { name: "Massachusetts Institute of Technology", country: "United States", level: "University" },
  { name: "California Institute of Technology", country: "United States", level: "University" },
  { name: "Columbia University", country: "United States", level: "University" },
  { name: "University of Chicago", country: "United States", level: "University" },
  { name: "Yale University", country: "United States", level: "University" },
  { name: "Princeton University", country: "United States", level: "University" },
  { name: "Cornell University", country: "United States", level: "University" },
  { name: "University of Pennsylvania", country: "United States", level: "University" },
  { name: "Duke University", country: "United States", level: "University" },
  { name: "Johns Hopkins University", country: "United States", level: "University" },
  { name: "Northwestern University", country: "United States", level: "University" },
  { name: "Dartmouth College", country: "United States", level: "University" },
  { name: "Brown University", country: "United States", level: "University" },
  { name: "Vanderbilt University", country: "United States", level: "University" },
  { name: "Rice University", country: "United States", level: "University" },
  { name: "University of Notre Dame", country: "United States", level: "University" },
  { name: "University of California, Los Angeles", country: "United States", level: "University" },
  { name: "University of California, Berkeley", country: "United States", level: "University" },
  { name: "University of California, San Diego", country: "United States", level: "University" },
  { name: "University of California, Davis", country: "United States", level: "University" },
  { name: "University of California, Santa Barbara", country: "United States", level: "University" },
  { name: "University of Southern California", country: "United States", level: "University" },
  { name: "New York University", country: "United States", level: "University" },
  { name: "Georgetown University", country: "United States", level: "University" },
  { name: "Carnegie Mellon University", country: "United States", level: "University" },
  { name: "Emory University", country: "United States", level: "University" },
  { name: "University of Michigan", country: "United States", level: "University" },
  { name: "University of Virginia", country: "United States", level: "University" },
  { name: "University of North Carolina at Chapel Hill", country: "United States", level: "University" },
  { name: "University of Texas at Austin", country: "United States", level: "University" },
  { name: "University of Washington", country: "United States", level: "University" },
  { name: "University of Illinois Urbana-Champaign", country: "United States", level: "University" },
  { name: "Georgia Institute of Technology", country: "United States", level: "University" },
  { name: "University of Wisconsin-Madison", country: "United States", level: "University" },
  { name: "Purdue University", country: "United States", level: "University" },
  { name: "Penn State University", country: "United States", level: "University" },
  { name: "Ohio State University", country: "United States", level: "University" },
  { name: "Michigan State University", country: "United States", level: "University" },
  { name: "Boston University", country: "United States", level: "University" },
  { name: "Northeastern University", country: "United States", level: "University" },
  { name: "Tufts University", country: "United States", level: "University" },
  { name: "Wake Forest University", country: "United States", level: "University" },

  // ── United Kingdom ──
  { name: "University of Oxford", country: "United Kingdom", level: "University" },
  { name: "University of Cambridge", country: "United Kingdom", level: "University" },
  { name: "Imperial College London", country: "United Kingdom", level: "University" },
  { name: "London School of Economics", country: "United Kingdom", level: "University" },
  { name: "University College London", country: "United Kingdom", level: "University" },
  { name: "King's College London", country: "United Kingdom", level: "University" },
  { name: "University of Edinburgh", country: "United Kingdom", level: "University" },
  { name: "University of Manchester", country: "United Kingdom", level: "University" },
  { name: "University of Bristol", country: "United Kingdom", level: "University" },
  { name: "University of Warwick", country: "United Kingdom", level: "University" },
  { name: "University of Glasgow", country: "United Kingdom", level: "University" },
  { name: "University of Birmingham", country: "United Kingdom", level: "University" },
  { name: "University of Leeds", country: "United Kingdom", level: "University" },
  { name: "Durham University", country: "United Kingdom", level: "University" },
  { name: "University of Sheffield", country: "United Kingdom", level: "University" },
  { name: "University of Nottingham", country: "United Kingdom", level: "University" },
  { name: "University of Southampton", country: "United Kingdom", level: "University" },
  { name: "Queen Mary University of London", country: "United Kingdom", level: "University" },
  { name: "University of St Andrews", country: "United Kingdom", level: "University" },

  // ── Canada ──
  { name: "University of Toronto", country: "Canada", level: "University" },
  { name: "University of British Columbia", country: "Canada", level: "University" },
  { name: "McGill University", country: "Canada", level: "University" },
  { name: "University of Alberta", country: "Canada", level: "University" },
  { name: "McMaster University", country: "Canada", level: "University" },
  { name: "University of Waterloo", country: "Canada", level: "University" },
  { name: "Western University", country: "Canada", level: "University" },
  { name: "Queen's University", country: "Canada", level: "University" },
  { name: "Simon Fraser University", country: "Canada", level: "University" },
  { name: "Dalhousie University", country: "Canada", level: "University" },

  // ── Australia ──
  { name: "Australian National University", country: "Australia", level: "University" },
  { name: "University of Melbourne", country: "Australia", level: "University" },
  { name: "University of Sydney", country: "Australia", level: "University" },
  { name: "University of Queensland", country: "Australia", level: "University" },
  { name: "Monash University", country: "Australia", level: "University" },
  { name: "University of New South Wales", country: "Australia", level: "University" },
  { name: "University of Western Australia", country: "Australia", level: "University" },
  { name: "University of Adelaide", country: "Australia", level: "University" },

  // ── Singapore ──
  { name: "National University of Singapore", country: "Singapore", level: "University" },
  { name: "Nanyang Technological University", country: "Singapore", level: "University" },
  { name: "Singapore Management University", country: "Singapore", level: "University" },
  { name: "Singapore University of Technology and Design", country: "Singapore", level: "University" },
  { name: "Singapore Institute of Technology", country: "Singapore", level: "University" },

  // ── Japan ──
  { name: "University of Tokyo", country: "Japan", level: "University" },
  { name: "Kyoto University", country: "Japan", level: "University" },
  { name: "Osaka University", country: "Japan", level: "University" },
  { name: "Tohoku University", country: "Japan", level: "University" },
  { name: "Waseda University", country: "Japan", level: "University" },
  { name: "Keio University", country: "Japan", level: "University" },
  { name: "Tokyo Institute of Technology", country: "Japan", level: "University" },

  // ── South Korea ──
  { name: "Seoul National University", country: "South Korea", level: "University" },
  { name: "Korea Advanced Institute of Science and Technology", country: "South Korea", level: "University" },
  { name: "Yonsei University", country: "South Korea", level: "University" },
  { name: "Korea University", country: "South Korea", level: "University" },
  { name: "Sungkyunkwan University", country: "South Korea", level: "University" },
  { name: "Pohang University of Science and Technology", country: "South Korea", level: "University" },
];

function searchSchools(query) {
  if (query.length < 2) return [];
  const q = query.toLowerCase();
  return SCHOOLS.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 8);
}

export default function SchoolSearch({ value, onSelect }) {
  const [query, setQuery]     = useState(value || "");
  const [results, setResults] = useState([]);
  const [open, setOpen]       = useState(false);
  const wrapperRef            = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => { setQuery(value || ""); }, [value]);

  function handleChange(e) {
    const q = e.target.value;
    setQuery(q);
    setResults(searchSchools(q));
    setOpen(true);
  }

  function handleSelect(school) {
    setQuery(school.name);
    setOpen(false);
    setResults([]);
    onSelect({ name: school.name, level: school.level });
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => query.length >= 2 && setOpen(true)}
        placeholder="Type your school name, e.g. HKU, USC, Oxford"
        className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition bg-white"
      />

      {/* Dropdown */}
      {open && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
          {results.map((school, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => handleSelect(school)}
                className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 transition-colors flex items-center justify-between gap-2"
              >
                <div>
                  <p className="text-sm font-medium text-stone-800">{school.name}</p>
                  <p className="text-xs text-stone-400">{school.country}</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md flex-shrink-0">
                  {school.level}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-xl shadow-lg px-4 py-3">
          <p className="text-xs text-stone-400">No matches — you can still type your school name manually.</p>
        </div>
      )}
    </div>
  );
}
