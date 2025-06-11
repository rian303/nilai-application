import { useRef, useState } from "react";
import logoSekolah from "./assets/logo-sekolah.png";
import logoSvg from "./assets/logo-svg.png";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [kelas, setKelas] = useState("");
  const searchInp = useRef();

  const searchMurid = async () => {
    const muridName = searchInp.current.value;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/nilai-app?murid=${muridName}&kelas=${kelas}`
      );

      setData(res.data);
    } catch (err) {
      setData(err.response.data);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      {/* Hero Section */}
      <header className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
          Pengumuman Nilai Rapor Matematika Wajib
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4">
          Semester Genap 2024/2025
        </h2>
        <h3 className="text-lg md:text-xl font-medium text-blue-500">
          SMA YASPI
        </h3>
      </header>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <p className="text-gray-700 mb-6 text-center">
              Silakan masukkan nama siswa untuk melihat nilai rapor semester
              genap.
            </p>

            <div className="mb-6 relative">
              <div className="mb-4">
                <input
                  type="text"
                  ref={searchInp}
                  className="w-full px-3 py-2 focus:outline-none border-gray-400 border-2 rounded-lg"
                  placeholder="Masukkan nama siswa..."
                />
              </div>
              <div className="mb-4">
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className={`cursor-pointer w-full p-2 border rounded-lg border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                >
                  <option value="" className="text-red" disabled>
                    Pilih Kelas
                  </option>
                  <option value="10">10</option>
                  <option value="11 A">11 A</option>
                  <option value="11 B">11 B</option>
                  <option value="12 IPA">12 IPA</option>
                  <option value="12 IPS">12 IPS</option>
                </select>
              </div>

              <div className="mb-4">
                <button
                  onClick={searchMurid}
                  className="cursor-pointer w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                >
                  Cari
                </button>
              </div>
            </div>

            <div>
              {data?.nama ? (
                <div id="resultContainer">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg result-appear">
                    <div className="flex items-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <h3 className="text-lg font-semibold text-blue-800">
                        Hasil Pencarian
                      </h3>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Nama Siswa:</p>
                      <p
                        id="studentName"
                        className="font-semibold text-gray-800 text-lg"
                      >
                        {data.nama}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Nilai Matematika Wajib:
                      </p>
                      <div className="flex items-center">
                        <span
                          id="studentGrade"
                          className="text-3xl font-bold text-blue-700"
                        >
                          {data.nilai}
                        </span>
                        <div
                          id="gradeStatus"
                          className={`ml-3 px-3 py-1 text-sm font-medium rounded-full ${
                            data.nilai >= 70
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {data.nilai >= 70 ? "LULUS" : "BELUM LULUS"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : data?.message ? (
                <div id="noResultContainer">
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg result-appear">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                      <p className="text-yellow-700">{data.message}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="font-semibold text-gray-800">Catatan Penting</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Jika mengalami kendala dalam mengakses nilai, harap hubungi wali
              kelas masing-masing.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2 align-middle justify-center">
          <div className="relative align-middle justify-center">
            <img src={logoSvg} alt="svg logo" className="w-full h-auto" />
          </div>
        </div>
      </div>

      <footer className=" text-gray-400 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">Hak Cipta © 2025 SMA YASPI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
