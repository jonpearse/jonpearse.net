class Media < ApplicationRecord

  # relations
  has_one_attached :file
  add_assignable_attributes( :file )
  add_unserialisable_attrs( :preview )
  add_serialisable_attrs( :base64_preview )

  # validate things
  validates :title, presence: true

  # update the preview
  before_save :update_aspect_ratio
  after_commit :schedule_preview_generation, unless: -> { @generating_preview.present? }

  def cms_image

    file.variant( combine_options: { resize: '150x150^', gravity: :center, crop: '150x150+0+0' })

  end

  def base64_preview

    preview ||= ''

    "data:image/png;base64,#{Base64.encode64( preview ).gsub( /\n/, '' )}"

  end

  # Returns the ‘real’ width of this file
  def native_width

    file.blob.metadata['width']

  end

  def generate_preview

    # create a temporary file + dump stuff into it
    tmp = Tempfile.new( "media#{id}-", Rails.root.join('tmp') )
    tmp.binmode
    tmp.write( file.download )

    # now, compress + stuff
    out = ImageProcessing::MiniMagick.resize_to_limit( 20, 20 ).convert( 'png' ).call( tmp )
    `optipng -o7 --strip all -quiet #{out.path} && pngquant -o #{out.path} -f --strip 16 #{out.path}`

    # update stuff
    write_back = File.open( out.path, 'rb' )
    write_attribute( :preview, write_back.read.force_encoding( 'UTF-8' ))
    write_back.close

    # if we can get a colour
    `convert #{tmp.path} -resize 1x1 txt:-`.match( /#([0-9a-f]{6})/i ){ |m| write_attribute( :colour, m[1] )}

    # tidy up
    tmp.close
    tmp.delete
    out.close
    out.delete

  end

  def generate_preview!

    @generating_preview = true

    generate_preview and save

  end

  private

    def schedule_preview_generation

      MediaWorker.perform_async( self.id )

    end

    # @TODO: get this working sensibly
    def update_aspect_ratio

      ar = 1.0

      if file.blob.metadata.key?( 'width' ) and file.blob.metadata.key?( 'height' )

        ar = ( file.blob.metadata['width'].to_f / file.blob.metadata['height'].to_f ) rescue 1.0

      end

      write_attribute( :aspect_ratio, ar )

    end

end
