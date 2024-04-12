import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Service = () => {
    const { products } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category
    const [sortBy, setSortBy] = useState('');

    if (!Array.isArray(products)) {
        // Handle the case when products is not available or not an array
        return <div className='container'>Loading...</div>;
    }

    // Sorting functions
    const sortProducts = (type) => {
        let sortedProducts = [...filteredProducts];
        if (type === 'lowest') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (type === 'highest') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        return sortedProducts;
    };
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // Filter products based on search term and selected category
    const filteredProducts = products.filter((product) =>
        product.productname.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || product.category === selectedCategory) // Apply category filter
    );

    const sortedProducts = sortBy ? sortProducts(sortBy) : filteredProducts;

    // Get unique categories from products
    const categories = Array.from(new Set(products.map((product) => product.category)));

    return (
        <section className="section-services">
            <div className="container service_head">
                {/* <h1 style={{color:"goldenrod"}} className="service_heading">Services</h1> */}
            </div>

            <div className="container section_search">
                <input
                    className='search'
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch style={{fontSize:"2.5rem"}}/>

                {/* Category selection dropdown */}
                <select
                    className='category-select'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                        className='category-select'
                        value={sortBy}
                        onChange={handleSortChange}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value=''>Sort By</option>
                        <option value='lowest'>Lowest Price</option>
                        <option value='highest'>Highest Price</option>
                    </select>
            </div>

            <div className="container grid grid-four-cols">
                {sortedProducts.map((curElem, index) => {
                    // Display only if the product is not booked
                    if (curElem.booked) {
                        return null; // Do not show anything for booked products
                    }

                    return (
                        <div className="card" key={index}>
                            <div className="card-img">
                                <img src={`/images/productimages/${curElem.image}`} alt={curElem.productname} />
                            </div>
                            <hr/>
                            <div className="card-details">
                                <div className="additional-info">
                                    <h2>{curElem.productname}</h2> 
                                </div>
                                <div className='additional-info'>
                                    <p className="price">₹ {curElem.price}</p>
                                    <h3 style={{marginLeft:"-5rem", color:"red"}}>{curElem.category}</h3> 
                                </div>
                                <div className="phone-number"> 
                                    <span>
                                        <Link className="book" to={`/user/bookproduct/${curElem._id}`}>
                                            Details
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Service;
