export class T1DUsernameGenerator {
  private static readonly T1D_PREFIXES = [
    'Glucose', 'Insulin', 'Pump', 'CGM', 'Dexcom', 'Libre', 'Omnipod', 'Tandem',
    'Diabetes', 'T1D', 'T2D', 'Pancreas', 'Beta', 'Autoimmune', 'Endocrine',
    'Sugar', 'Blood', 'Monitor', 'Sensor', 'Infusion', 'Basal', 'Bolus',
    'A1C', 'HbA1c', 'TIR', 'TimeInRange', 'Hypo', 'Hyper', 'DKA',
    'Carb', 'Keto', 'LowCarb', 'Exercise', 'Fitness', 'Wellness',
    'Warrior', 'Fighter', 'Survivor', 'Thriver', 'Advocate', 'Educator'
  ]

  private static readonly T1D_SUFFIXES = [
    'Pro', 'Master', 'Guru', 'Ninja', 'Warrior', 'Fighter', 'Champion',
    'Explorer', 'Adventurer', 'Pioneer', 'Innovator', 'Scientist', 'Researcher',
    'Coach', 'Trainer', 'Mentor', 'Guide', 'Helper', 'Supporter', 'Friend',
    'Buddy', 'Pal', 'Mate', 'Comrade', 'Ally', 'Partner', 'Teammate',
    'Hero', 'Legend', 'Star', 'Rock', 'Gem', 'Diamond', 'Gold',
    'Silver', 'Bronze', 'Iron', 'Steel', 'Titan', 'Giant', 'Tower'
  ]

  private static readonly T1D_ANIMALS = [
    'Lion', 'Tiger', 'Bear', 'Wolf', 'Eagle', 'Hawk', 'Falcon', 'Phoenix',
    'Dragon', 'Unicorn', 'Pegasus', 'Griffin', 'Dolphin', 'Shark', 'Whale',
    'Elephant', 'Giraffe', 'Zebra', 'Cheetah', 'Leopard', 'Jaguar', 'Panther',
    'Fox', 'Coyote', 'Raccoon', 'Owl', 'Raven', 'Crow', 'Sparrow', 'Robin'
  ]

  private static readonly T1D_COLORS = [
    'Blue', 'Green', 'Red', 'Yellow', 'Purple', 'Orange', 'Pink', 'Teal',
    'Cyan', 'Magenta', 'Indigo', 'Violet', 'Amber', 'Emerald', 'Ruby',
    'Sapphire', 'Topaz', 'Jade', 'Coral', 'Lavender', 'Mint', 'Peach'
  ]

  private static readonly T1D_NUMBERS = [
    '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017',
    '365', '180', '90', '60', '30', '7', '24', '12', '6', '3', '1',
    '007', '123', '456', '789', '000', '111', '222', '333', '444', '555'
  ]

  private static readonly T1D_SYMBOLS = [
    'X', 'Z', 'Q', 'V', 'W', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'A'
  ]

  public static generateUsername(): string {
    const patterns = [
      () => `${this.getRandomElement(this.T1D_PREFIXES)}${this.getRandomElement(this.T1D_SUFFIXES)}`,
      () => `${this.getRandomElement(this.T1D_COLORS)}${this.getRandomElement(this.T1D_ANIMALS)}`,
      () => `${this.getRandomElement(this.T1D_PREFIXES)}${this.getRandomElement(this.T1D_NUMBERS)}`,
      () => `${this.getRandomElement(this.T1D_ANIMALS)}${this.getRandomElement(this.T1D_SYMBOLS)}`,
      () => `${this.getRandomElement(this.T1D_PREFIXES)}_${this.getRandomElement(this.T1D_SUFFIXES)}`,
      () => `${this.getRandomElement(this.T1D_COLORS)}_${this.getRandomElement(this.T1D_ANIMALS)}`,
      () => `${this.getRandomElement(this.T1D_PREFIXES)}${this.getRandomElement(this.T1D_SYMBOLS)}${this.getRandomElement(this.T1D_NUMBERS)}`,
      () => `${this.getRandomElement(this.T1D_ANIMALS)}${this.getRandomElement(this.T1D_COLORS)}${this.getRandomElement(this.T1D_NUMBERS)}`
    ]

    const pattern = this.getRandomElement(patterns)
    return pattern()
  }

  public static generateMultipleUsernames(count: number = 5): string[] {
    const usernames: string[] = []
    for (let i = 0; i < count; i++) {
      usernames.push(this.generateUsername())
    }
    return usernames
  }

  public static validateUsername(username: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (username.length < 3) {
      errors.push('Username must be at least 3 characters long')
    }
    
    if (username.length > 20) {
      errors.push('Username must be no more than 20 characters long')
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push('Username can only contain letters, numbers, and underscores')
    }
    
    if (!/^[a-zA-Z]/.test(username)) {
      errors.push('Username must start with a letter')
    }
    
    if (username.toLowerCase().includes('admin') || username.toLowerCase().includes('moderator')) {
      errors.push('Username cannot contain restricted terms')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }
}
