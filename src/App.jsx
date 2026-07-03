import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import ProductCard from './components/ProductCard'
import StickyCTA from './components/StickyCTA';
import Footer from './components/Footer'
import { products } from './data'
import DashBoard from './components/DashBoard';

function App() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <Hero />
      <TrustBar />
      
      {/* Seção de Produtos */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Popular Designs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard 
            key={product.id}
            title={product.title}
            imageUrl={product.imageUrl}
            affiliateLink={product.affiliateLink}
            />
          ))}
        </div>
      </section>
      {process.env.NODE_ENV === 'development' && <DashBoard />}
      <Footer />
      <StickyCTA />
    </main>
  )
}

export default App