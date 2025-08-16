import { NextResponse } from "next/server"
import { publicDataRetriever } from "@/lib/public-data-retriever"

export async function GET() {
  try {
    const discountCodes = await publicDataRetriever.retrieveDiscountCodes()
    await new Promise(resolve => setTimeout(resolve, 250)) // Simulate API delay

    // Generate strategic advice based on data analysis
    const strategicAdvice = generateStrategicAdvice(discountCodes)

    return NextResponse.json({
      success: true,
      data: discountCodes,
      summary: {
        totalCodes: discountCodes.length,
        activeCodes: discountCodes.filter(c => new Date() < c.validUntil).length,
        expiringSoon: discountCodes.filter(c => {
          const daysUntilExpiry = Math.ceil((c.validUntil.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          return daysUntilExpiry <= 7 && daysUntilExpiry > 0
        }).length,
        topPharmacies: discountCodes
          .reduce((acc, code) => {
            acc[code.pharmacy] = (acc[code.pharmacy] || 0) + 1
            return acc
          }, {} as Record<string, number>),
        averageDiscount: discountCodes.length > 0 
          ? Math.round(discountCodes.reduce((sum, code) => {
              const discountValue = parseFloat(code.discount.replace(/[^0-9.-]/g, ''))
              return sum + discountValue
            }, 0) / discountCodes.length)
          : 0,
      },
      insights: {
        successRateByPharmacy: discountCodes.reduce((acc, code) => {
          if (!acc[code.pharmacy]) {
            acc[code.pharmacy] = { total: 0, successful: 0 }
          }
          acc[code.pharmacy].total++
          if (code.successRate > 0.7) {
            acc[code.pharmacy].successful++
          }
          return acc
        }, {} as Record<string, { total: number, successful: number }>),
        discountByInsulinBrand: discountCodes.reduce((acc, code) => {
          code.insulinBrands.forEach(brand => {
            if (!acc[brand]) acc[brand] = []
            acc[brand].push(code.discount)
          })
          return acc
        }, {} as Record<string, string[]>),
        requirementsAnalysis: discountCodes.reduce((acc, code) => {
          code.requirements.forEach(req => {
            acc[req] = (acc[req] || 0) + 1
          })
          return acc
        }, {} as Record<string, number>),
      },
      strategicAdvice,
      lastUpdated: publicDataRetriever.getLastRetrieved(),
      nextUpdate: new Date(Date.now() + 60 * 60 * 1000)
    })
  } catch (error) {
    console.error("Failed to fetch discount codes data:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch discount codes data",
      data: [],
      summary: {
        totalCodes: 0,
        activeCodes: 0,
        expiringSoon: 0,
        topPharmacies: {},
        averageDiscount: 0,
      },
      insights: {
        successRateByPharmacy: {},
        discountByInsulinBrand: {},
        requirementsAnalysis: {},
      },
      strategicAdvice: []
    }, { status: 500 })
  }
}

function generateStrategicAdvice(discountCodes: any[]): any[] {
  const advice = []
  
  // Analyze pharmacy systems and success patterns
  const pharmacyAnalysis = discountCodes.reduce((acc, code) => {
    if (!acc[code.pharmacy]) {
      acc[code.pharmacy] = {
        totalCodes: 0,
        successRates: [],
        requirements: new Set(),
        insulinBrands: new Set()
      }
    }
    acc[code.pharmacy].totalCodes++
    acc[code.pharmacy].successRates.push(code.successRate)
    code.requirements.forEach((req: string) => acc[code.pharmacy].requirements.add(req))
    code.insulinBrands.forEach((brand: string) => acc[code.pharmacy].insulinBrands.add(brand))
    return acc
  }, {} as Record<string, any>)

  // Generate strategic advice for each pharmacy
  Object.entries(pharmacyAnalysis).forEach(([pharmacy, data]) => {
    const avgSuccessRate = data.successRates.reduce((a: number, b: number) => a + b, 0) / data.successRates.length
    
    if (avgSuccessRate > 0.8) {
      advice.push({
        type: 'high-success-pharmacy',
        pharmacy,
        message: `${pharmacy} has a high success rate (${Math.round(avgSuccessRate * 100)}%). Consider using their discount codes first.`,
        strategy: 'Use this pharmacy as your primary option for discounts.',
        requirements: Array.from(data.requirements),
        insulinBrands: Array.from(data.insulinBrands)
      })
    }

    // Insurance vs. no insurance strategy
    if (data.requirements.has('no insurance')) {
      advice.push({
        type: 'insurance-strategy',
        pharmacy,
        message: `${pharmacy} offers better discounts without insurance. Consider asking your pharmacy to run the prescription without insurance first.`,
        strategy: '1. Ask pharmacy to run without insurance\n2. Apply discount code\n3. Compare final price with insurance copay',
        expectedSavings: 'Typically 20-80% off retail price',
        requirements: Array.from(data.requirements)
      })
    }
  })

  // General strategic advice
  advice.push({
    type: 'general-strategy',
    message: 'Maximize your savings with these strategies:',
    strategies: [
      'Always compare insurance copay vs. discount code pricing',
      'Ask pharmacies to run prescriptions both ways',
      'Use manufacturer coupons in combination with pharmacy discounts',
      'Check for patient assistance programs if discounts aren\'t sufficient',
      'Consider mail-order pharmacies for bulk purchases',
      'Look for loyalty programs and rewards at major pharmacy chains'
    ],
    timing: 'Best to check prices monthly as codes and insurance benefits change'
  })

  return advice
}
