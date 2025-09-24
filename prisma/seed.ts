import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seeding...')

    // Check if seeding has already been done
    console.log('Checking if database has already been seeded...')
    const existingCategory = await prisma.category.findFirst({
        where: {
            slug: 't-shirt'
        }
    })

    if (existingCategory) {
        console.log('✅ Database has already been seeded. Skipping to avoid duplicate records.')
        console.log('Found existing category:', existingCategory.name)
        return
    }

    console.log('📝 No existing data found. Proceeding with seeding...')

    // Create Category
    console.log('Creating category...')
    const category = await prisma.category.create({
        data: {
            slug: 't-shirt',
            name: 'T-Shirt'
        }
    })
    console.log('✅ Category created:', category.name)

    // Create CategoryMetadata
    console.log('Creating category metadata...')
    const categoryMetadata = await prisma.categoryMetadata.create({
        data: {
            id: 'tech',
            name: 'Technology',
            category_id: category.id
        }
    })
    console.log('✅ Category metadata created:', categoryMetadata.name)

    // Create Banners
    console.log('Creating banners...')
    const banners = await Promise.all([
        prisma.banner.create({
            data: {
                img: 'banner_promo_1.jpg',
                link: '/categories/t-shirt'
            }
        }),
        prisma.banner.create({
            data: {
                img: 'banner_promo_2.jpg',
                link: '/categories/shoes'
            }
        })
    ])
    console.log('✅ Banners created:', banners.length)

    // Create MetadataValues
    console.log('Creating metadata values...')
    const metadataValues = await Promise.all([
        prisma.metadataValue.create({
            data: {
                id: 'node',
                label: 'Node',
                categoryMetadata_id: 'tech'
            }
        }),
        prisma.metadataValue.create({
            data: {
                id: 'react',
                label: 'React',
                categoryMetadata_id: 'tech'
            }
        }),
        prisma.metadataValue.create({
            data: {
                id: 'python',
                label: 'Python',
                categoryMetadata_id: 'tech'
            }
        }),
        prisma.metadataValue.create({
            data: {
                id: 'php',
                label: 'PHP',
                categoryMetadata_id: 'tech'
            }
        })
    ])
    console.log('✅ Metadata values created:', metadataValues.length)

    // Create Products
    console.log('Creating products...')
    const products = await Promise.all([
        prisma.product.create({
            data: {
                label: 'T-Shirt RN',
                price: 89.90,
                description: 't-shirt React Native, perfect for devs',
                category_id: category.id
            }
        }),
        prisma.product.create({
            data: {
                label: 'T-Shirt React',
                price: 94.50,
                description: 'T-Shirt logo React, show you front-end chest',
                category_id: category.id
            }
        }),
        prisma.product.create({
            data: {
                label: 'T-Shirt Python',
                price: 79.99,
                description: 'T-Shirt design Python, be faster as a snake =D',
                category_id: category.id
            }
        }),
        prisma.product.create({
            data: {
                label: 'T-Shirt PHP',
                price: 69.90,
                description: 'T-Shirt PHP, always being killed, but always alive',
                category_id: category.id
            }
        })
    ])
    console.log('✅ Products created:', products.length)

    // Create ProductImages for each product
    console.log('Creating product images...')
    const productImages = []
    for (const product of products) {
        const images = await Promise.all([
            prisma.productImage.create({
                data: {
                    product_id: product.id,
                    url: `product_${product.id}_1.jpg`
                }
            }),
            prisma.productImage.create({
                data: {
                    product_id: product.id,
                    url: `product_${product.id}_2.jpg`
                }
            })
        ])
        productImages.push(...images)
    }
    console.log('✅ Product images created:', productImages.length)

    // Create ProductMetadata for each product
    console.log('Creating product metadata...')
    const productMetadata = await Promise.all([
        prisma.productMetadata.create({
            data: {
                product_id: products[0].id,
                categoryMetadata_id: 'tech',
                metadataValue_id: 'react'
            }
        }),
        prisma.productMetadata.create({
            data: {
                product_id: products[1].id,
                categoryMetadata_id: 'tech',
                metadataValue_id: 'react'
            }
        }),
        prisma.productMetadata.create({
            data: {
                product_id: products[2].id,
                categoryMetadata_id: 'tech',
                metadataValue_id: 'python'
            }
        }),
        prisma.productMetadata.create({
            data: {
                product_id: products[3].id,
                categoryMetadata_id: 'tech',
                metadataValue_id: 'php'
            }
        })
    ])
    console.log('✅ Product metadata created:', productMetadata.length)

    console.log('🎉 Database seeding completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
