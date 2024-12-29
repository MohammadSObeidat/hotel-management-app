import './HomePage.css'
import img1 from '../../../../assets/images/Rectangle 3 (1).png'
import img2 from '../../../../assets/images/Rectangle 3 (2).png'
import img3 from '../../../../assets/images/Rectangle 3 (3).png'
import img4 from '../../../../assets/images/Rectangle 3 (4).png'
import img5 from '../../../../assets/images/two1 (1).png'
import img6 from '../../../../assets/images/two1 (2).png'
import img7 from '../../../../assets/images/two1 (3).png'
import img8 from '../../../../assets/images/two1 (4).png'
import Hero from '../Hero/Hero';
import MostPopularAds from '../MostPopularAds/MostPopularAds';
import StaticSection from '../../../staticSection/components/StaticSection/StaticSection';
import AdsUser from '../../../adsUser/components/AdsUser/AdsUser'
import Sliders from '../Sliders/Sliders'
import { useEffect } from 'react'

const itemsStaticOne = [
  {
    id: 1,
    img: img1,
    title: 'Tabby Town',
    description: 'Gunung Batu, Indonesia'
  },
  {
    id: 2,
    img: img2,
    title: 'Anggana',
    description: 'Bogor, Indonesia'
  },
  {
    id: 3,
    img: img3,
    title: 'Seattle Rain',
    description: 'Jakarta, Indonesia'
  },
  {
    id: 4,
    img: img4,
    title: 'Wodden Pit',
    description: 'Wonosobo, Indonesia'
  },
]

const itemsStaticTwo = [
  {
    id: 1,
    img: img5,
    title: 'Green Park',
    description: 'Tangerang, Indonesia'
  },
  {
    id: 2,
    img: img6,
    title: 'Podo Wae',
    description: 'Madiun, Indonesia'
  },
  {
    id: 3,
    img: img7,
    title: 'Silver Rain',
    description: 'Bandung, Indonesia'
  },
  {
    id: 4,
    img: img8,
    title: 'Cashville',
    description: 'Kemang, Indonesia'
  },
]

export default function HomePage() {

  useEffect(() => {
    scrollTo(0,0)
  }, [])

  return (
    <>
    {/* =============================== Hero Section ======================== */}
      <Hero/>
    {/* =============================== Popular Section ===================== */}
      <MostPopularAds/>
    {/* =============================== Static Section ====================== */}
    <StaticSection title={'Houses with beauty backyard'} items={itemsStaticOne}/>
    <StaticSection title={'Hotels with large living room'} items={itemsStaticTwo}/>
    {/* =============================== Ads Section ========================= */}
    <AdsUser/>
    <Sliders/>
    </>
  )
}
