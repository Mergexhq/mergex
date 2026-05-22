import {defineConfig, buildLegacyTheme} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {media} from 'sanity-plugin-media'
import React from 'react'

// Define the custom dark theme colors matching MergeX dark UI
const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': '#121212',
  '--white': '#ECECE8',
  '--gray': '#a1a1aa',
  '--gray-base': '#a1a1aa',

  /* Brand */
  '--brand-primary': '#8B5CF6',

  /* Navbar */
  '--main-navigation-color': '#121212',
  '--main-navigation-color--inverted': '#ECECE8',

  /* Focus color */
  '--focus-color': '#8B5CF6',

  /* Component background/text */
  '--component-bg': '#121212',
  '--component-text-color': '#ECECE8',

  /* Default button colors */
  '--default-button-color': '#242424',
  '--default-button-primary-color': '#8B5CF6',
  '--default-button-success-color': '#10B981',
  '--default-button-warning-color': '#F59E0B',
  '--default-button-danger-color': '#EF4444',

  /* State colors */
  '--state-info-color': '#8B5CF6',
  '--state-success-color': '#10B981',
  '--state-warning-color': '#F59E0B',
  '--state-danger-color': '#EF4444',
})

// Custom Logo Component using standard React.createElement to work in .ts file
const MergexLogo = () => {
  return React.createElement('img', {
    src: '/static/logo/flat_logo.png',
    alt: 'MergeX Logo',
    style: {
      width: '24px',
      height: '24px',
      objectFit: 'contain',
      display: 'block',
    },
  })
}

export default defineConfig({
  name: 'default',
  title: 'Mergex Console',

  projectId: 'zkyzlgqd',
  dataset: 'production',

  icon: MergexLogo,
  theme: myTheme,

  plugins: [
    structureTool({
      structure,
    }),
    media(),
  ],

  releases: {
    enabled: false,
  },

  schema: {
    types: schemaTypes,
    // Prevent singleton types from being created via the global "Create new..." button
    templates: (prev) =>
      prev.filter((template) => !['privacyPolicy', 'termsOfUse', 'globalSettings'].includes(template.id)),
  },

  document: {
    // Disable create/delete actions for singletons
    actions: (prev, context) => {
      const singletonTypes = new Set(['privacyPolicy', 'termsOfUse', 'globalSettings'])
      if (singletonTypes.has(context.schemaType)) {
        return prev.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
      }
      return prev
    },
  },
})
