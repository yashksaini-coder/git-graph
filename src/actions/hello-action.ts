'use server';

export async function helloAction(name: string) {
  // Validate input
  if (!name || name.trim().length === 0) {
    return {
      success: false,
      message: 'Please provide a valid name'
    };
  }

  // Provide a nicely formatted response
  const formattedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
  
  return {
    success: true,
    message: `Hello, ${formattedName}! Your GitHub graph is being generated.`
  };
}