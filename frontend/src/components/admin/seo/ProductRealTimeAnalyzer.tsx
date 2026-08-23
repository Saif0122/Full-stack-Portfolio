import React, { useMemo } from 'react';
import { Card } from '@/components/ui';

interface ProductRealTimeAnalyzerProps {
  productData: any;
}

export const ProductRealTimeAnalyzer = ({ productData }: ProductRealTimeAnalyzerProps) => {

  const analysis = useMemo(() => {
    let seoScore = 0;
    let readinessScore = 0;
    const checks = {
      seo: [] as { label: string; passed: boolean; weight: number }[],
      readiness: [] as { label: string; passed: boolean; weight: number }[]
    };

    const seo = productData?.seo || {};

    // 1. SEO Completeness (35% of Readiness, but also its own 100 point score)
    const hasFocusKeyword = !!seo.focusKeyword?.trim();
    const hasMetaTitle = seo.metaTitle?.length > 10 && seo.metaTitle?.length <= 60;
    const hasMetaDesc = seo.metaDescription?.length > 50 && seo.metaDescription?.length <= 160;
    const hasCanonical = !!seo.canonicalUrl;
    
    let seoPoints = 0;
    if (hasFocusKeyword) seoPoints += 30;
    if (hasMetaTitle) seoPoints += 30;
    if (hasMetaDesc) seoPoints += 30;
    if (hasCanonical) seoPoints += 10;
    seoScore = seoPoints;

    checks.seo.push({ label: 'Focus Keyword Present', passed: hasFocusKeyword, weight: 30 });
    checks.seo.push({ label: 'Optimal Meta Title Length', passed: hasMetaTitle, weight: 30 });
    checks.seo.push({ label: 'Optimal Meta Description', passed: hasMetaDesc, weight: 30 });
    checks.seo.push({ label: 'Canonical URL Set', passed: hasCanonical, weight: 10 });

    // 2. Readiness: Documentation (15%)
    const hasDocs = !!productData?.documentationUrl || !!productData?.installationGuide;
    if (hasDocs) readinessScore += 15;
    checks.readiness.push({ label: 'Documentation Available', passed: hasDocs, weight: 15 });

    // 3. Readiness: Demo Availability (10%)
    const hasDemo = !!productData?.livePreviewUrl || !!productData?.videoPreviewUrl;
    if (hasDemo) readinessScore += 10;
    checks.readiness.push({ label: 'Demo or Preview Available', passed: hasDemo, weight: 10 });

    // 4. Readiness: License Information (10%)
    const hasLicense = !!productData?.licenseType;
    if (hasLicense) readinessScore += 10;
    checks.readiness.push({ label: 'License Information Defined', passed: hasLicense, weight: 10 });

    // 5. Readiness: Download Package (10%)
    const hasDownload = !!productData?.localFileUrl || !!productData?.githubRepoUrl;
    if (hasDownload) readinessScore += 10;
    checks.readiness.push({ label: 'Download Package Linked', passed: hasDownload, weight: 10 });

    // 6. Readiness: Images & Media (10% derived from Image Quality Score)
    let imageScore = 0;
    const hasHero = !!productData?.thumbnail;
    const images = productData?.images || [];
    const hasMin3 = images.length >= 3;
    const hasAltText = images.length > 0 && images.every((img: any) => !!img.altText);
    const hasDemoVid = !!productData?.videoPreviewUrl;

    if (hasHero) imageScore += 40;
    if (hasMin3) imageScore += 30;
    if (hasAltText) imageScore += 20;
    if (hasDemoVid) imageScore += 10;

    const imageQualityPassed = imageScore >= 70;
    if (imageQualityPassed) readinessScore += 10;
    checks.readiness.push({ label: `Image Quality Score (${imageScore}/100)`, passed: imageQualityPassed, weight: 10 });

    // 7. Readiness: Schema (5%)
    const hasSchema = !!productData?.brand && !!productData?.sku; // minimal proxy for valid schema
    if (hasSchema) readinessScore += 5;
    checks.readiness.push({ label: 'Product Schema Required Fields (Brand, SKU)', passed: hasSchema, weight: 5 });

    // 8. Readiness: Changelog (5%)
    const hasChangelog = productData?.changelog && productData?.changelog.length > 0;
    if (hasChangelog) readinessScore += 5;
    checks.readiness.push({ label: 'Changelog Maintained', passed: hasChangelog, weight: 5 });

    // Finally add SEO Completeness to Readiness Score
    const seoCompletenessPassed = seoScore >= 80;
    if (seoCompletenessPassed) readinessScore += 35;
    checks.readiness.push({ label: `SEO Completeness (${seoScore}/100)`, passed: seoCompletenessPassed, weight: 35 });

    return { seoScore, readinessScore, checks, imageScore };
  }, [productData]);

  const getBadge = (score: number) => {
    if (score >= 95) return { label: 'Excellent', color: 'bg-green-500', text: 'text-green-500' };
    if (score >= 80) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
    if (score >= 60) return { label: 'Needs Improvement', color: 'bg-yellow-500', text: 'text-yellow-500' };
    return { label: 'Critical', color: 'bg-red-500', text: 'text-red-500' };
  };

  const getPublishBadge = (score: number) => {
    if (score >= 95) return { label: 'Production Ready', color: 'bg-emerald-500' };
    if (score >= 85) return { label: 'Ready to Publish', color: 'bg-teal-500' };
    if (score >= 70) return { label: 'Almost Ready', color: 'bg-blue-500' };
    if (score >= 50) return { label: 'Needs Improvement', color: 'bg-yellow-500' };
    return { label: 'Draft', color: 'bg-red-500' };
  };

  const seoBadge = getBadge(analysis.seoScore);
  const readinessBadge = getPublishBadge(analysis.readinessScore);

  return (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <h3 className="text-lg font-bold text-white mb-6">Marketplace Health</h3>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-gray-800 border border-gray-700 text-center">
          <p className="text-sm text-gray-400 mb-1">SEO Score</p>
          <div className={`text-4xl font-black ${seoBadge.text}`}>{analysis.seoScore}</div>
          <p className={`text-xs mt-2 font-semibold ${seoBadge.text}`}>{seoBadge.label}</p>
        </div>
        <div className="p-4 rounded-xl bg-gray-800 border border-gray-700 text-center">
          <p className="text-sm text-gray-400 mb-1">Readiness Score</p>
          <div className="text-4xl font-black text-white">{analysis.readinessScore}</div>
          <div className={`text-xs mt-2 font-semibold px-2 py-1 rounded-full text-white inline-block ${readinessBadge.color}`}>
            {readinessBadge.label}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">SEO Checks</h4>
          <ul className="space-y-2">
            {analysis.checks.seo.map((check, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  {check.passed ? (
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">×</span>
                  )}
                  <span className={check.passed ? 'text-gray-300' : 'text-gray-500'}>{check.label}</span>
                </span>
                <span className="text-gray-600 text-xs">{check.weight}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Product Readiness</h4>
          <ul className="space-y-2">
            {analysis.checks.readiness.map((check, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  {check.passed ? (
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">×</span>
                  )}
                  <span className={check.passed ? 'text-gray-300' : 'text-gray-500'}>{check.label}</span>
                </span>
                <span className="text-gray-600 text-xs">{check.weight}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
