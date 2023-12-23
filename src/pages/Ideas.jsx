import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import axios from 'axios';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Ideas = () => {

    const [dataAPI, setDataAPI] = useState([]);
    const [totalPages, setTotalPages] = useState(28)
    const { pageNumber, sort, pageSize } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const pageNumberParam = searchParams.get('pageNumber') || '1';
    const sortParam = searchParams.get('sort') || 'published_at';
    const pageSizeParam = searchParams.get('pageSize') || '10';

    
    const API = import.meta.env.VITE_API

    const getTotalPageNumber = (pageSize) => {
        const calculatedTotalPages = Math.ceil(274 / pageSize);
        setTotalPages(calculatedTotalPages);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API,
                {
                    params: {
                        'page[number]': pageNumberParam,
                        'page[size]': pageSizeParam,
                        append: ['small_image', 'medium_image'],        
                        sort: sortParam,
                    },
                }
                );
                localStorage.setItem('dataApiLocal', JSON.stringify(response.data.data));
                getTotalPageNumber(pageSizeParam);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        setDataAPI(JSON.parse(localStorage.getItem('dataApiLocal')));
    }, [pageNumberParam, pageSizeParam, sortParam]);

    // Fungsi untuk mengubah nilai parameter URL
    const updateUrlParams = (pageNumber, sort, pageSize) => {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('pageNumber', pageNumber);
        newSearchParams.set('sort', sort);
        newSearchParams.set('pageSize', pageSize);
        navigate(`/ideas?${newSearchParams.toString()}`);
        window.location.reload();
    };

    // Fungsi untuk menghandle perubahan dropdown sort
    const handleSortChange = (event) => {
        const newSort = event.target.value;
        updateUrlParams(pageNumberParam, newSort, pageSizeParam);
    };

    // Fungsi untuk menghandle perubahan dropdown pageSize
    const handlePageSizeChange = (event) => {
        const newSize = event.target.value;
        updateUrlParams(pageNumberParam, sortParam, newSize);
        getTotalPageNumber(newSize);
    };

    const handlePageNumberChange = (newPage) =>{
        updateUrlParams(newPage, sortParam, pageSizeParam)
    }


    const optionsPage = ['10', '20', '50'];
    const valuePage = ['10', '20', '50'];
    const optionsDate = ['Newest', 'Oldest'];
    const valueDate = ['-published_at', 'published_at']

     // Formatting Dates into Date Month Year
     const formatDate = (publishedAt) => {
        const dateObject = new Date(publishedAt);
        const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
    
        const day = dateObject.getDate();
        const month = months[dateObject.getMonth()];
        const year = dateObject.getFullYear();
    
        return `${day} ${month} ${year}`;
    };

    const formattedDates = dataAPI.map((item) => formatDate(item.published_at));

    
  return (
    <>
    {/* Landing Page */}
    <div className="h-[60vh] bg-[url('/img/background.jpg')] bg-no-repeat bg-cover z-0 flex justify-center items-center w-full ">
        <div className='flex-col justify-center items-center text-white'>
            <h1 className='text-[41px] text-center'>Ideas</h1>
            <h2 className='text-[19px]'>Where all our great things begin</h2>
        </div>
        <div class="absolute bottom-[40vh] right-0 
            border-l-[100vw] border-l-transparent
            border-b-[15vh] border-b-white
            border-r-[0px] border-r-transparent">
        </div>
    </div>

    {/* Content */}
    <div className='min-h-screen 2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-6 px-6 py-10'>
        {/* Sorting */}
        <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-between'>
            {pageSizeParam * pageNumberParam < 274 ? (
                <div>Showing {1 + ((pageNumberParam-1) * pageSizeParam )}-{pageSizeParam * pageNumberParam} of 274</div>
            ):(
                <div>Showing {1 + ((pageNumberParam-1) * pageSizeParam )}-274 of 274</div>
            )}
            <div className='flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-end 2xl:gap-20 xl:gap-20 lg:gap-20 md:gap-20 sm:gap-2 gap-2 items-start'>
                <Dropdown options={optionsPage} label="Show per page:" valueSelect={pageSizeParam} valueOption={valuePage} handleChange={handlePageSizeChange}/>
                <Dropdown options={optionsDate} label="Sort by:" valueSelect={sortParam} valueOption={valueDate} handleChange={handleSortChange}/>
            </div>
        </div>

        {/* Cards */}
        <div>
            <div className='py-10'>
            {dataAPI ? (
                <div className='flex flex-col items-stretch justify-between'>
                    <div className="flex justify-start flex-grow-0 gap-10 flex-wrap">
                    {/* Dropdown list content */}
                    {dataAPI.map((data, index) => (
                        <>
                            <Link to={`/ideas/${data.slug}`} className=' w-[250px] rounded-xl shadow-md shadow-gray-400 hover:bg-primary1 duration-500'>
                                <div className='flex items-center justify-center'>
                                    <img className='w-[250px] h-[150px] rounded-t-xl' src={data.medium_image && data.medium_image[0] && data.medium_image[0].url} alt={data.slug} />
                                </div>
                                <div className='p-4'>
                                    <h1 className='uppercase font-bold text-[#CDCDCD]'>{formattedDates[index]}</h1>
                                    <h1 className='font-bold text-[20px] line-clamp-3'>{data.title}</h1>
                                </div>
                            </Link>
                        </>
                    ))}
                    </div>
                </div>
            ): (
                <p>Tidak ada data</p>
            )}
            </div>
        </div>
        {/* Pagination */}
        <div className='flex justify-center items-center gap-2'>
            <button 
                onClick={() => handlePageNumberChange(1)} 
                disabled={pageNumberParam === '1'}
                className={`${pageNumberParam === '1' ? 'text-gray-300' : 'text-black'} px-4 py-2`}
            >
                <FaAngleDoubleLeft/>
            </button>
            
            <button 
                onClick={() => handlePageNumberChange((parseInt(pageNumberParam)-1).toString())} 
                disabled={pageNumberParam === '1'}
                className={`${pageNumberParam === '1' ? 'text-gray-300' : 'text-black'} px-1`}
            >
                <FaAngleLeft/>
            </button>

            {/* {totalPages > 5 && pageNumberParam > 3 && (
                <button onClick={() => handlePageNumberChange(1)} style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}>
                1
                </button>
            )} */}

            {/* {pageNumberParam > 4 && <span style={{ marginRight: '8px' }}>...</span>} */}

            {Array.from({ length: Math.min(3, totalPages - 1) }, (_, index) => index + Math.max(1, parseInt(pageNumberParam) - 2)).map((page) => (
                <button
                key={page}
                onClick={() => handlePageNumberChange(page)}
                disabled={page === parseInt(pageNumberParam)}
                className={`${page===parseInt(pageNumberParam) ? "bg-primary1 text-white" : "bg-transparent text-black"} px-4 py-2 rounded-xl`}
                >
                {page}
                </button>
            ))}

            {parseInt(pageNumberParam) < totalPages && <span style={{ marginRight: '8px' }}>...</span>}

            {/* <button
            onClick={() => handlePageNumberChange(totalPages)}
            className={`${pageNumberParam === totalPages.toString() ? "bg-primary1 text-white" : "bg-transparent text-black"} px-4 py-2 rounded-xl`}
            >
                {totalPages}
            </button> */}

            <button
                onClick={() => handlePageNumberChange((parseInt(pageNumberParam)+1).toString())} 
                disabled={pageNumberParam === totalPages.toString()}
                className={`${pageNumberParam === totalPages.toString() ? 'text-gray-300' : 'text-black'} px-1`}
            >
                <FaAngleRight/>
            </button>

            <button 
                onClick={() => handlePageNumberChange(totalPages)} 
                style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}
                disabled={pageNumberParam === totalPages.toString()}
                className={`${pageNumberParam === totalPages.toString() ? 'text-gray-300' : 'text-black'} px-4 py-2`}
            >
                <FaAngleDoubleRight/>
            </button>
        </div>
    </div>
    </>
  )
}

export default Ideas