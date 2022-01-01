import axios from 'axios';
// import Hero from '../components/hero';
import Image from 'next/image';
import {init} from 'ityped';
import {MutableRefObject, useEffect, useRef} from 'react';

interface Posts{
  isIndonesia: Array<any>
}


const Home = (props: Posts)=> 
{
  const myText = useRef() as MutableRefObject<HTMLInputElement>;
  useEffect(()=>{ 
    init(myText.current,{
      showCursor: true,
      strings: ['Mencuci tangan', 'Menjaga jarak', 'Memakai masker', 'Menghindari kerumunan', 'Mengurangin mobilitas'],
    });
  }, [])

  const {isIndonesia} = props;
  return(
    <>
     <div id="home">
      <div className="wrapper bg-gradient-to-b from-gray-600 to-gray-800 min-h-screen">
        <nav>
          <div className="container mx-auto pt-10">
            <div className="flex text-white ml-8 md:px-0">
              <div className="flex justify-start w-1/4">
                <h3 className='text-5xl font-bold'><a>covID</a></h3>
              </div>
            </div>
          </div>
        </nav>

       
          <div className="container mx-auto">
            <div className="flex">
              <div className="hidden text-white md:flex w-2/4 justify-start flex-col ml-8 mt-12">
                <h3 className='text-4xl font-bold mt-12'>
                  CORONA
                </h3>
                <h5 className='text-2xl my-5'>Virus Disease (COVID-19)</h5>
                <p>Virus Corona atau severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) adalah virus yang menyerang sistem pernapasan. Penyakit akibat infeksi virus ini disebut COVID-19. Virus Corona bisa menyebabkan gangguan ringan pada sistem pernapasan, infeksi paru-paru yang berat, hingga kematian.</p>

                <h5 className='text-lg bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded w-fit mt-5 py-3 px-4 font-semibold'><a href="https://temenin.kemkes.go.id/" className='hover:underline underline-offset-8'>Telemedis Indonesia</a></h5>

              </div>
              <div className="flex md:w-2/4 justify-center">
                <div className="relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <Image src='/sneez.jpg' width={400} height={400}/>
                  </div>
                    <Image src='/bloobs.svg'width={700} height={700} />
                </div>
              </div>
            </div>
            <div className="text-center text-2xl text-white mb-5">
              <h3 className='font-bold'>Jangan lupakan 5M </h3><span ref={myText}></span>
            </div>
            <div className="flex pt-8 ml-8 flex-wrap pb-9">
              <h3 className='text-lg w-full md:text-2xl font text-white font-semibold py-5'>Sebaran COVID-19 di Indonesia</h3>
              {isIndonesia.map((show)=>{
                return(
                  <>
                    <div className="flex w-10/12 mt-5 md:w-fit bg-yellow-400 rounded text-white py-5 px-5 mx-5 shadow-lg shadow-yellow-400/50">
                      <h5 className='text-lg'>Pasien Positif:</h5>
                      <p className='text-lg'>&nbsp;{show.positif}</p>
                    </div>
                    <div className="flex w-10/12 mt-5 md:w-fit bg-green-600 rounded text-white py-5 px-5 mx-5 shadow-lg shadow-green-600/50">
                      <h5 className='text-lg'>Pasien Sembuh:</h5>
                      <p className='text-lg'>&nbsp;{show.sembuh}</p>
                    </div>
                    <div className="flex w-10/12 mt-5 md:w-fit bg-red-500 rounded text-white py-5 px-5 mx-5 shadow-lg shadow-red-500/50">
                      <h5 className='text-lg'>Pasien Meninggal:</h5>
                      <p className='text-lg'>&nbsp;{show.meninggal}</p>
                    </div>
                    <div className="flex w-10/12 mt-5 md:w-fit bg-teal-500 rounded text-white py-5 px-5 mx-5 shadow-lg shadow-teal-500/50">
                      <h5 className='text-lg'>Pasien Dirawat:</h5>
                      <p className='text-lg'>&nbsp;{show.dirawat}</p>
                    </div>
                  </>
                )
              })}

            </div>
          </div>
          <div className="text-center">
            <h5 className='text-sm text-white py-5'>&copy;Aditya - 2022</h5>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home;

Home.getInitialProps = 
  async function(){
    const resID = await axios.get('https://api.kawalcorona.com/indonesia');
    const posts = await resID.data;
    return{
      isIndonesia: posts,
    }

  }