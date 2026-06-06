import { StructureResolver } from 'sanity/structure'
import {
  BookOpen,
  FileText,
  Briefcase,
  Shield,
  Scale,
  Settings,
  PenTool,
  Trophy,
  Star,
  FileSignature
} from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // 1. Publishing Group
      S.listItem()
        .title('Publishing')
        .icon(BookOpen)
        .child(
          S.list()
            .title('Publishing')
            .items([
              // Insights Sub-menu with Rich Filters
              S.listItem()
                .title('Insights')
                .icon(PenTool)
                .child(
                  S.list()
                    .title('Insights Filters')
                    .items([
                      S.listItem()
                        .title('All Insights')
                        .icon(PenTool)
                        .child(S.documentTypeList('insight').title('All Insights')),
                      S.listItem()
                        .title('Featured Insights')
                        .icon(Star)
                        .child(
                          S.documentTypeList('insight')
                            .title('Featured Insights')
                            .filter('_type == "insight" && featuredInsight == true')
                        ),
                      S.listItem()
                        .title('Drafts')
                        .icon(FileSignature)
                        .child(
                          S.documentTypeList('insight')
                            .title('Draft Insights')
                            .filter('_type == "insight" && _id in path("drafts.**")')
                        ),
                    ])
                ),
              // Case Studies
              S.listItem()
                .title('Case Studies')
                .icon(Trophy)
                .schemaType('caseStudy')
                .child(S.documentTypeList('caseStudy').title('Case Studies')),
            ])
        ),
      S.divider(),

      // 2. Company Group
      S.listItem()
        .title('Company')
        .icon(Briefcase)
        .child(
          S.list()
            .title('Company')
            .items([
              S.listItem()
                .title('Careers')
                .icon(Briefcase)
                .schemaType('career')
                .child(S.documentTypeList('career').title('Careers')),
            ])
        ),
      S.divider(),

      // 3. Legal Group
      S.listItem()
        .title('Legal')
        .icon(Shield)
        .child(
          S.list()
            .title('Legal Settings')
            .items([
              S.listItem()
                .title('Privacy Policy')
                .icon(Shield)
                .id('privacyPolicy')
                .child(
                  S.document()
                    .schemaType('privacyPolicy')
                    .documentId('privacyPolicy')
                    .title('Privacy Policy')
                ),
              S.listItem()
                .title('Terms of Use')
                .icon(Scale)
                .id('termsOfUse')
                .child(
                  S.document()
                    .schemaType('termsOfUse')
                    .documentId('termsOfUse')
                    .title('Terms of Use')
                ),
            ])
        ),
      S.divider(),

      // 4. System Group
      S.listItem()
        .title('System')
        .icon(Settings)
        .child(
          S.list()
            .title('System Settings')
            .items([
              S.listItem()
                .title('Global Settings')
                .icon(Settings)
                .id('globalSettings')
                .child(
                  S.document()
                    .schemaType('globalSettings')
                    .documentId('globalSettings')
                    .title('Global Settings')
                ),
            ])
        ),
    ])
