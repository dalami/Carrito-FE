import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';


export const Footer = () => {
    return (
        <>
        <div className="flex flex-row items-center justify-center bg-slate-300 h-36">
        <Link href="https://www.instagram.com/" target="_blank"><i className="m-8 w bi bi-instagram"></i></Link> 
        <Link href="https://www.facebook.com/" target="_blank"><i className="m-8 bi bi-facebook"></i></Link> 
        <Link href="https://www.twitter.com/" target="_blank"><i className="m-8 bi bi-twitter-x"></i></Link> 
        <Link href="https://www.youtube.com/" target="_blank"><i className="m-8 bi bi-youtube"></i></Link> 
       
       
        </div>
        <div className="text-center">
            <p>© Diego Alami 2024</p>
        </div>
        </>
        
    )
}

export default Footer