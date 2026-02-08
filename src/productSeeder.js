require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');

// MongoDB connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// High-quality product data
const products = [
    // RACKETS
    {
        name: 'Yonex Astrox 88D Pro',
        description: 'Dominate the court with the Astrox 88D Pro. Designed for aggressive players who demand maximum power in their smashes. The rotational generator system distributes weight throughout the grip end, frame top, and joint for maximum control. Perfect for advanced players seeking that extra edge.',
        basePrice: 18999,
        salePrice: 15999,
        category: 'rackets',
        stock: 12,
        images: [
            'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
            'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800'
        ],
        specifications: {
            weight: '88g (4U)',
            flex: 'Extra Stiff',
            balance: 'Head Heavy',
            gripSize: 'G5',
            material: 'H.M. Graphite / Namd',
            maxTension: '30 lbs',
            madeIn: 'Japan',
            level: 'Advanced'
        }
    },
    {
        name: 'Yonex Nanoflare 1000Z',
        description: 'Experience lightning-fast swing speeds with the Nanoflare 1000Z. Engineered with Sonic Flare System for exceptional repulsion power and speed. The ultra-slim shaft design reduces air resistance, allowing for rapid-fire shots and incredible maneuverability.',
        basePrice: 16999,
        salePrice: 13999,
        category: 'rackets',
        stock: 15,
        images: [
            'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800'
        ],
        specifications: {
            weight: '83g (3U)',
            flex: 'Stiff',
            balance: 'Even Balance',
            gripSize: 'G4',
            material: 'H.M. Graphite / Namd',
            maxTension: '29 lbs',
            madeIn: 'Japan',
            level: 'Intermediate to Advanced'
        }
    },
    {
        name: 'Victor Thruster K 9900',
        description: 'The ultimate weapon for offensive players. Featuring PYROFIL carbon fiber and HARD CORED TECHNOLOGY for enhanced frame stability. Delivers explosive power with pinpoint accuracy. Tournament-grade performance for serious competitors.',
        basePrice: 14999,
        salePrice: 12499,
        category: 'rackets',
        stock: 10,
        images: [
            'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800'
        ],
        specifications: {
            weight: '85g (4U)',
            flex: 'Medium',
            balance: 'Head Heavy',
            gripSize: 'G5',
            material: 'PYROFIL Carbon',
            maxTension: '32 lbs',
            madeIn: 'Taiwan',
            level: 'Advanced'
        }
    },
    {
        name: 'Li-Ning Axforce 100 Max',
        description: 'Unleash maximum power with the Axforce 100 Max. Built with Dynamic-Optimum Frame and Aerotec-Beam System for superior aerodynamics. The wing stabilizer technology ensures consistent power delivery across the entire string bed.',
        basePrice: 13999,
        salePrice: 11499,
        category: 'rackets',
        stock: 8,
        images: [
            'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800'
        ],
        specifications: {
            weight: '87g (3U)',
            flex: 'Medium Stiff',
            balance: 'Head Heavy',
            gripSize: 'S2',
            material: 'Carbon Fiber',
            maxTension: '30 lbs',
            madeIn: 'China',
            level: 'Intermediate'
        }
    },

    // APPAREL - Men
    {
        name: 'Yonex Championship Tournament Shirt',
        description: 'Official tournament-grade performance shirt crafted with VERYCOOL technology for superior moisture management. Lightweight, breathable mesh panels ensure maximum ventilation during intense matches. Anti-bacterial treatment keeps you fresh all day.',
        basePrice: 3999,
        salePrice: 2999,
        category: 'apparel',
        stock: 25,
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
        ],
        specifications: {
            gender: 'Men',
            sizes: 'S, M, L, XL, XXL',
            material: 'Polyester with VERYCOOL',
            fit: 'Athletic Fit',
            features: 'Moisture-wicking, Anti-odor, UV Protection',
            care: 'Machine washable'
        }
    },
    {
        name: 'Victor Professional Match Shorts',
        description: 'Premium competition shorts designed for unrestricted movement. Four-way stretch fabric with reinforced stitching for durability. Deep pockets for shuttles and lightweight construction for all-day comfort.',
        basePrice: 2999,
        salePrice: 2299,
        category: 'apparel',
        stock: 30,
        images: [
            'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'
        ],
        specifications: {
            gender: 'Men',
            sizes: 'S, M, L, XL, XXL',
            material: 'Polyester Spandex Blend',
            fit: 'Regular Fit',
            features: 'Quick-dry, Stretch, Side pockets',
            inseam: '9 inches'
        }
    },
    {
        name: 'Li-Ning Elite Training Jacket',
        description: 'Versatile training jacket with weather-resistant finish. Perfect for warm-ups and cool-downs. Features zippered pockets, adjustable cuffs, and reflective details for low-light visibility.',
        basePrice: 4999,
        salePrice: 3799,
        category: 'apparel',
        stock: 18,
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'
        ],
        specifications: {
            gender: 'Unisex',
            sizes: 'S, M, L, XL, XXL',
            material: 'Polyester with DWR coating',
            features: 'Wind-resistant, Breathable, Reflective trim',
            pockets: 'Zippered hand pockets'
        }
    },

    // APPAREL - Women
    {
        name: 'Yonex Ladies Tournament Dress',
        description: 'Elegant competition dress combining style with performance. Built-in shorts for confidence, VERYCOOL technology for temperature regulation. Flattering silhouette designed specifically for female athletes.',
        basePrice: 4499,
        salePrice: 3499,
        category: 'apparel',
        stock: 20,
        images: [
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800'
        ],
        specifications: {
            gender: 'Women',
            sizes: 'XS, S, M, L, XL',
            material: 'Polyester with VERYCOOL',
            features: 'Built-in shorts, Moisture-wicking, UV Protection',
            length: 'Above knee',
            fit: 'Slim fit with stretch'
        }
    },

    // SHOES
    {
        name: 'Yonex Power Cushion 65Z3',
        description: 'Revolutionary court shoe featuring Power Cushion+ technology for exceptional shock absorption. 3-layer Power Cushion converts landing impact into take-off energy. Durable sole with excellent grip for quick directional changes.',
        basePrice: 12999,
        salePrice: 10499,
        category: 'shoes',
        stock: 22,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
        ],
        specifications: {
            gender: 'Men',
            sizes: 'UK 7, 8, 9, 10, 11, 12',
            technology: 'Power Cushion+, Toe Assist Shape',
            sole: 'Anti-slip rubber',
            upper: 'Synthetic leather + mesh',
            weight: '310g (UK 9)',
            features: 'Shock absorption, Energy return, Lateral support'
        }
    },
    {
        name: 'Victor A922 Professional Court Shoes',
        description: 'Elite-level badminton shoe with ENERGYMAX V technology for superior cushioning. Light Resilient EVA midsole reduces fatigue during long matches. V-Durable+ sole for exceptional durability and traction.',
        basePrice: 10999,
        salePrice: 8999,
        category: 'shoes',
        stock: 18,
        images: [
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800'
        ],
        specifications: {
            gender: 'Men',
            sizes: 'UK 7, 8, 9, 10, 11, 12',
            technology: 'ENERGYMAX V, LSC, V-Durable+',
            sole: 'Non-marking rubber',
            upper: 'Microfiber PU + mesh',
            weight: '295g (UK 9)',
            features: 'Lightweight, Breathable, Arch support'
        }
    },
    {
        name: 'Li-Ning Saga Lite Elite Women',
        description: 'Premium women\'s badminton shoe designed for agility and comfort. Cushion+ technology provides soft landings while maintaining responsiveness. Breathable upper keeps feet cool during intense play.',
        basePrice: 9999,
        salePrice: 7999,
        category: 'shoes',
        stock: 15,
        images: [
            'https://images.unsplash.com/photo-1603787081473-c328f18ff5c1?w=800'
        ],
        specifications: {
            gender: 'Women',
            sizes: 'UK 4, 5, 6, 7, 8, 9',
            technology: 'Cushion+, Bounse+',
            sole: 'Anti-slip TPU',
            upper: 'Mono yarn + TPU',
            weight: '260g (UK 6)',
            features: 'Lightweight, Extra cushioning, Wide toe box'
        }
    },

    // BAGS
    {
        name: 'Yonex Pro Racquet Bag - 9 Pack',
        description: 'Professional tournament bag with space for 9 racquets. Multiple compartments including thermal-lined main chamber, ventilated shoe compartment, and accessory pockets. Adjustable shoulder straps and reinforced handles for comfortable carrying.',
        basePrice: 8999,
        salePrice: 6999,
        category: 'bags',
        stock: 12,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
        ],
        specifications: {
            capacity: '9 racquets',
            compartments: 'Main thermal, Shoe, 2 Accessory pockets',
            dimensions: '75cm x 35cm x 30cm',
            material: 'Durable polyester',
            features: 'Thermal protection, Water-resistant, Padded straps',
            color: 'Black/Blue'
        }
    },
    {
        name: 'Victor Backpack Pro Series',
        description: 'Versatile badminton backpack perfect for training and travel. Dedicated racquet compartment holds up to 2 racquets. Laptop sleeve, multiple organizer pockets, and padded back panel for all-day comfort.',
        basePrice: 4999,
        salePrice: 3799,
        category: 'bags',
        stock: 20,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
        ],
        specifications: {
            capacity: '2 racquets + gear',
            compartments: 'Racquet, Laptop (15"), Main, Front pockets',
            dimensions: '48cm x 32cm x 18cm',
            material: 'Water-resistant polyester',
            features: 'Padded straps, Laptop sleeve, Water bottle holder',
            color: 'Black/Red'
        }
    },

    // ACCESSORIES
    {
        name: 'Yonex Super Grap Overgrip - 30 Pack',
        description: 'Premium tacky overgrip for superior control and comfort. Moisture-absorbent surface maintains consistent grip even during sweaty matches. Ultra-thin 0.6mm design preserves handle feel. Tournament favorite worldwide.',
        basePrice: 1299,
        salePrice: 999,
        category: 'accessories',
        stock: 50,
        images: [
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
        ],
        specifications: {
            quantity: '30 grips',
            thickness: '0.6mm',
            material: 'Premium polyurethane',
            features: 'Tacky, Absorbent, Durable',
            colors: 'Black, White, Assorted',
            length: '115cm per grip'
        }
    },
    {
        name: 'Li-Ning Professional Feather Shuttlecock - A+90',
        description: 'Tournament-grade goose feather shuttlecocks. Precision-selected 16-feather construction for consistent flight. Cork base with leather reinforcement for durability. BWF approved for competitive play.',
        basePrice: 3999,
        salePrice: 3299,
        category: 'shuttles',
        stock: 40,
        images: [
            'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800'
        ],
        specifications: {
            quantity: '12 shuttles per tube',
            type: 'Goose Feather',
            speed: '77 (Medium)',
            grade: 'Tournament Grade',
            feathers: '16-feather construction',
            base: 'Premium cork',
            approval: 'BWF Approved'
        }
    },
    {
        name: 'Victor Gold Champion Shuttlecock',
        description: 'Premium tournament shuttlecock with exceptional durability. Selected first-grade goose feathers ensure stable flight path. Composite cork base provides optimal weight distribution. Perfect for competitive matches.',
        basePrice: 4499,
        salePrice: 3799,
        category: 'shuttles',
        stock: 35,
        images: [
            'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800'
        ],
        specifications: {
            quantity: '12 shuttles per tube',
            type: 'Goose Feather',
            speed: '76, 77, 78 available',
            grade: 'Gold (Premium)',
            feathers: '16-feather premium grade',
            base: 'Composite cork',
            durability: 'High'
        }
    },
    {
        name: 'Yonex BG80 Power Badminton String',
        description: 'High-intensity string for power players. 0.68mm gauge provides excellent repulsion and durability. Oval-shaped multifilament core absorbs shock while maintaining crisp feel. Ideal for aggressive smashers.',
        basePrice: 899,
        salePrice: 699,
        category: 'accessories',
        stock: 60,
        images: [
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
        ],
        specifications: {
            gauge: '0.68mm',
            length: '10m (33ft)',
            type: 'Multifilament',
            features: 'High repulsion, Durable, Shock absorption',
            recommendedTension: '20-29 lbs',
            color: 'White'
        }
    },
    {
        name: 'Victor Professional Wrist Support',
        description: 'Ergonomic wrist support for injury prevention and performance enhancement. Breathable elastic material with adjustable velcro strap. Provides compression without restricting movement.',
        basePrice: 799,
        salePrice: 599,
        category: 'accessories',
        stock: 45,
        images: [
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
        ],
        specifications: {
            sizes: 'One size adjustable',
            material: 'Elastic + Neoprene',
            features: 'Breathable, Adjustable, Moisture-wicking',
            support: 'Medium compression',
            color: 'Black'
        }
    },
    {
        name: 'Li-Ning Athlete Towel Grip - 5 Pack',
        description: 'Super absorbent towel grip for maximum moisture control. Soft cotton-blend material provides comfortable, non-slip grip. Perfect for players who sweat heavily. Easy to wash and reuse.',
        basePrice: 699,
        salePrice: 499,
        category: 'accessories',
        stock: 55,
        images: [
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
        ],
        specifications: {
            quantity: '5 grips',
            thickness: '1.8mm',
            material: 'Cotton blend',
            features: 'Super absorbent, Washable, Soft touch',
            colors: 'White, Black, Blue',
            length: '110cm per grip'
        }
    }
];

// Import data
const importData = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany();
        console.log('Existing products cleared...');

        // Insert new products
        await Product.insertMany(products);
        console.log(`${products.length} high-quality products added!`);

        // Display summary
        const categories = [...new Set(products.map(p => p.category))];
        console.log('\n=== PRODUCT SUMMARY ===');
        for (const cat of categories) {
            const count = products.filter(p => p.category === cat).length;
            console.log(`${cat}: ${count} products`);
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Run import
importData();
