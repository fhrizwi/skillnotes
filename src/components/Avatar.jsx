import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'

export default function AvatarComponent({ 
  name, 
  fallback, 
  size = 'md',
  className = '' 
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  }

  return (
    <Avatar.Root className={`inline-flex items-center justify-center align-middle overflow-hidden select-none w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 ${sizeClasses[size]} ${className}`}>
      <Avatar.Fallback 
        className="text-gray-600 dark:text-gray-300 font-medium leading-none flex items-center justify-center w-full h-full"
      >
        {fallback || (name ? name.charAt(0).toUpperCase() : 'U')}
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
