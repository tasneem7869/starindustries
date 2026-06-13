import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from './utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-600',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-[#1e3a5f]',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
