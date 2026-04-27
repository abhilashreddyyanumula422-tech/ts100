import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [collegesDropdown, setCollegesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  // ✅ CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".services-menu")) {
        setServicesDropdown(false);
        setActiveSubMenu(null);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const servicesLinks = [
    {
      name: "Credential Evaluation",
      submenu: [
        { name: "IEE Evaluation", path: "/services/iee" },
        { name: "ECE Evaluation", path: "/services/ece" },
        { name: "SpanTran (TEC)", path: "/services/spantran" },
        { name: "WES Evaluation", path: "/services/wes" },
        { name: "Educational Perspectives", path: "/services/ep" },
      ],
    },
    {
      name: "Certificates",
      submenu: [
        { name: "Transcripts / E-Transcripts", path: "/services/transcripts" },
        { name: "Provisional Certificate (PC)", path: "/services/pc" },
        { name: "Original Degree (OD)", path: "/services/od" },
        { name: "MOI Certificate", path: "/services/moi" },
        { name: "CMM", path: "/services/cmm" },
      ],
    },
    {
      name: "Verification",
      path: "/services/verification",
    },
  ];

  const partneredColleges = [
    {
      name: "Bhaskar Pharmacy College",
      path: "/partnered-colleges/bhaskar-pharmacy-college",
    },
    {
      name: "Joginpally B.R Pharmacy College",
      path: "/partnered-colleges/joginpally-br-pharmacy-college",
    },
    {
      name: "Siddhartha Institute of Technology & Sciences",
      path: "/partnered-colleges/siddhartha-institute-of-technology-sciences",
    },
  ];

  const dropdownStyle =
    "w-80 rounded-xl border border-slate-700 bg-[#1f2f44] py-2 text-white shadow-2xl";
  const itemStyle =
    "block px-6 py-4 font-semibold hover:bg-white/10 cursor-pointer";

  return (
    <nav className="fixed z-[100] w-full bg-[#2f4a6d] text-white">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-blue-400">100</span> Transcripts
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-8 items-center font-semibold">

          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>

          {/* ✅ SERVICES */}
          <li className="relative services-menu">
            <button
              onClick={() => setServicesDropdown(!servicesDropdown)}
              className="flex items-center gap-1"
            >
              SERVICES <FiChevronDown />
            </button>

            {servicesDropdown && (
              <div className="absolute left-0 top-full pt-3">
                <div className={dropdownStyle}>

                  {servicesLinks.map((item, index) => (
                    <div key={item.name} className="relative">

                      {item.submenu ? (
                        <>
                          <div
                            onClick={() =>
                              setActiveSubMenu(
                                activeSubMenu === index ? null : index
                              )
                            }
                            className={`${itemStyle} flex justify-between`}
                          >
                            {item.name}
                           <span>{'>'}</span>
                          </div>

                          {activeSubMenu === index && (
                            <div className="absolute left-full top-0 w-80 bg-[#1f2f44] border border-slate-700 rounded-xl py-2">

                              {item.submenu.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  className={itemStyle}
                                >
                                  {sub.name}
                                </Link>
                              ))}

                            </div>
                          )}
                        </>
                      ) : (
                        <Link to={item.path} className={itemStyle}>
                          {item.name}
                        </Link>
                      )}

                    </div>
                  ))}

                </div>
              </div>
            )}
          </li>

          <li><Link to="/apply">APPLY</Link></li>
          <li><Link to="/contact">CONTACT US</Link></li>

          {/* COLLEGES */}
          <li className="relative">
            <button onClick={() => setCollegesDropdown(!collegesDropdown)}>
              PARTNERED COLLEGES
            </button>

            {collegesDropdown && (
              <div className="absolute right-0 top-full pt-3">
                <div className={dropdownStyle}>
                  {partneredColleges.map((c) => (
                    <Link key={c.name} to={c.path} className={itemStyle}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

        </ul>

        {/* LOGIN */}
        <div className="hidden lg:block">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              LOGOUT
            </button>
          ) : (
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
              LOGIN
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden">
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden p-4 bg-[#2f4a6d] space-y-3">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/apply">APPLY</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;