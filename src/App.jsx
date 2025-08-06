import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { ArrowLeft, Camera, ExternalLink, Heart, MapPin, Calendar } from 'lucide-react'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('main') // 'main', 'profile'
  const [selectedSquirrel, setSelectedSquirrel] = useState(null)
  const [squirrels, setSquirrels] = useState([
    {
      id: 1,
      name: 'Jimmy',
      description: 'Jimmy eating a walnut on my porch',
      date: '8/6/2025',
      image: '/api/placeholder/300/200',
      species: 'Eastern Gray Squirrel',
      lastSeen: '8/6/2025',
      sightings: 5,
      location: 'Front Porch'
    },
    {
      id: 2,
      name: 'Cute Gray Squirrel',
      description: 'A beautiful gray squirrel spotted in the neighborhood. This little guy was very photogenic!',
      date: '8/6/2025',
      image: '/api/placeholder/300/200',
      species: 'Eastern Gray Squirrel',
      lastSeen: '8/5/2025',
      sightings: 3,
      location: 'Oak Tree'
    }
  ])

  const [newSquirrel, setNewSquirrel] = useState({
    name: '',
    description: '',
    image: null
  })

  const handleSquirrelClick = (squirrel) => {
    setSelectedSquirrel(squirrel)
    setCurrentView('profile')
  }

  const handleBackToGallery = () => {
    setCurrentView('main')
    setSelectedSquirrel(null)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewSquirrel(prev => ({ ...prev, image: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadSquirrel = () => {
    if (newSquirrel.name && newSquirrel.description && newSquirrel.image) {
      const newId = Math.max(...squirrels.map(s => s.id)) + 1
      const today = new Date().toLocaleDateString()
      
      setSquirrels(prev => [...prev, {
        id: newId,
        name: newSquirrel.name,
        description: newSquirrel.description,
        date: today,
        image: newSquirrel.image,
        species: 'Eastern Gray Squirrel', // Default species
        lastSeen: today,
        sightings: 1,
        location: 'Neighborhood'
      }])
      
      setNewSquirrel({ name: '', description: '', image: null })
    }
  }

  if (currentView === 'profile' && selectedSquirrel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBackToGallery}
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">{selectedSquirrel.name}</h1>
              <p className="text-purple-100">Added on {selectedSquirrel.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Photo & Basic Info */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Photo & Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <img 
                    src={selectedSquirrel.image} 
                    alt={selectedSquirrel.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="text-gray-700 mb-4">{selectedSquirrel.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span>{selectedSquirrel.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>Last seen: {selectedSquirrel.lastSeen}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <span>{selectedSquirrel.sightings} sightings</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Species Information */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Species Information</CardTitle>
                <CardDescription>Learn about your squirrel friend</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">{selectedSquirrel.species}</h3>
                <p className="text-gray-700 mb-4">
                  Eastern Gray Squirrels are medium-sized tree squirrels native to eastern North America. 
                  They typically weigh 1-1.5 pounds and have a body length of 9-12 inches with a bushy tail 
                  of similar length. They're highly adaptable and commonly found in urban and suburban areas.
                </p>
                <div className="space-y-2">
                  <p><strong>Habitat:</strong> Deciduous and mixed forests, parks, suburban areas</p>
                  <p><strong>Lifespan:</strong> 6-12 years in the wild</p>
                  <p><strong>Activity:</strong> Most active during dawn and dusk</p>
                </div>
              </CardContent>
            </Card>

            {/* Care & Feeding */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Care & Feeding Guide</CardTitle>
                <CardDescription>How to help your neighborhood squirrel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Recommended Foods:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                      <li>Unsalted nuts (walnuts, pecans, almonds)</li>
                      <li>Black oil sunflower seeds</li>
                      <li>Fresh fruits (apples, grapes)</li>
                      <li>Vegetables (kale, corn, sweet potatoes)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Feeding Tips:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                      <li>Always provide fresh water</li>
                      <li>Avoid salted or processed foods</li>
                      <li>Feed in moderation to maintain natural foraging</li>
                      <li>Place food in elevated, safe locations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources & Shopping */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Resources & Supplies</CardTitle>
                <CardDescription>Where to find squirrel food and supplies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Specialized Squirrel Food:</h4>
                    <div className="space-y-2">
                      <a 
                        href="https://henryspets.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <span className="text-sm">Henry's Pets - Premium Squirrel Food</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://exoticnutrition.com/collections/squirrel-products" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <span className="text-sm">Exotic Nutrition - Squirrel Blocks</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">General Pet Supplies:</h4>
                    <div className="space-y-2">
                      <a 
                        href="https://www.chewy.com/b/squirrel-supplies-139614" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <span className="text-sm">Chewy - Squirrel Supplies</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://duncraft.com/collections/squirrel-foods" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <span className="text-sm">Duncraft - Squirrel Foods</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            🐿️ Squirrel Next Door
          </h1>
          <p className="text-purple-100 text-lg">Upload, label, and browse your squirrel photos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-700">Upload New Squirrel Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
                  {newSquirrel.image ? (
                    <div className="space-y-4">
                      <img 
                        src={newSquirrel.image} 
                        alt="Preview" 
                        className="max-w-full h-48 object-cover mx-auto rounded-lg"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => setNewSquirrel(prev => ({ ...prev, image: null }))}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-gray-600 mb-2">Click to select or drag & drop your squirrel photo</p>
                        <p className="text-sm text-gray-500">Supports JPG, PNG, GIF</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer">
                          Select Photo
                        </Button>
                      </label>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Label (Name/Type)</label>
                    <Input
                      placeholder="e.g., Gray Squirrel, Nutkin, etc."
                      value={newSquirrel.name}
                      onChange={(e) => setNewSquirrel(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      placeholder="Tell us about this squirrel..."
                      value={newSquirrel.description}
                      onChange={(e) => setNewSquirrel(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleUploadSquirrel}
                  disabled={!newSquirrel.name || !newSquirrel.description || !newSquirrel.image}
                >
                  Upload Squirrel Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Section */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-700">Squirrel Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {squirrels.map((squirrel) => (
                  <div
                    key={squirrel.id}
                    onClick={() => handleSquirrelClick(squirrel)}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      <img 
                        src={squirrel.image} 
                        alt={squirrel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{squirrel.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{squirrel.description}</p>
                      <p className="text-gray-500 text-xs">{squirrel.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App

